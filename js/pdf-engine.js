// PDF Processing Engine (Extraction and Generation)
import { CONFIG, ERROR_MESSAGES, PROCESSING_STAGES } from './config.js';

export class PDFExtractor {
    constructor() {
        this.pdfjsLib = null;
    }

    async init() {
        // Load PDF.js from CDN
        if (!window.pdfjsLib) {
            await this.loadPDFJS();
        }
        this.pdfjsLib = window.pdfjsLib;
        this.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    async loadPDFJS() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async extractText(file) {
        await this.init();

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await this.pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            let fullText = '';
            const numPages = pdf.numPages;

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\n\n';
            }

            if (!fullText.trim()) {
                throw new Error(ERROR_MESSAGES.EXTRACTION_FAILED);
            }

            return fullText;
        } catch (error) {
            console.error('PDF extraction error:', error);
            throw new Error(ERROR_MESSAGES.EXTRACTION_FAILED);
        }
    }

    estimateTokenCount(text) {
        // Rough estimation: 1 token ≈ 4 characters
        return Math.ceil(text.length / 4);
    }
}

export class TextBatcher {
    constructor(batchSize = 10000) {
        this.batchSize = batchSize; // in tokens
    }

    createBatches(text, prompts) {
        const batches = [];
        const chunks = this.splitIntoChunks(text);

        for (const chunk of chunks) {
            const type = this.detectContentType(chunk);
            const prompt = this.getPromptForType(type, prompts);

            batches.push({
                text: `${prompt}\n\n${chunk}`,
                originalText: chunk,
                type: type
            });
        }

        return batches;
    }

    splitIntoChunks(text) {
        const chunks = [];
        const paragraphs = text.split(/\n\n+/);
        let currentChunk = '';
        let currentTokens = 0;

        for (const paragraph of paragraphs) {
            const paragraphTokens = this.estimateTokens(paragraph);

            if (currentTokens + paragraphTokens > this.batchSize && currentChunk) {
                chunks.push(currentChunk.trim());
                currentChunk = paragraph;
                currentTokens = paragraphTokens;
            } else {
                currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
                currentTokens += paragraphTokens;
            }
        }

        if (currentChunk) {
            chunks.push(currentChunk.trim());
        }

        return chunks;
    }

    detectContentType(text) {
        // Simple heuristics to detect content type
        const codePatterns = [
            /function\s+\w+\s*\(/,
            /class\s+\w+/,
            /def\s+\w+\s*\(/,
            /import\s+\w+/,
            /const\s+\w+\s*=/,
            /let\s+\w+\s*=/,
            /var\s+\w+\s*=/,
            /{[\s\S]*}/
        ];

        const mathPatterns = [
            /\$[^$]+\$/,
            /\^[0-9]/,
            /\\[a-z]+{/,
            /∑|∫|∂|√|π|∞/
        ];

        const tablePatterns = [
            /\|[\s\S]*\|/,
            /\t[\s\S]*\t/
        ];

        if (codePatterns.some(pattern => pattern.test(text))) {
            return 'code';
        }

        if (mathPatterns.some(pattern => pattern.test(text))) {
            return 'math';
        }

        if (tablePatterns.some(pattern => pattern.test(text))) {
            return 'table';
        }

        return 'general';
    }

    getPromptForType(type, prompts) {
        return prompts[type] || prompts.general;
    }

    estimateTokens(text) {
        return Math.ceil(text.length / 4);
    }
}

export class PDFGenerator {
    constructor() {
        this.jsPDF = null;
    }

    async init() {
        // LoadPDF from CDN
        if (!window.jspdf) {
            await this.loadJSPDF();
        }
        this.jsPDF = window.jspdf.jsPDF;
    }

    async loadJSPDF() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async generatePDF(transformedBatches, originalFileName, pdfStyle) {
        await this.init();

        try {
            const doc = new this.jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const { fontSize, lineHeight, marginSize } = pdfStyle;
            const pageWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const maxWidth = pageWidth - (marginSize * 2);

            doc.setFontSize(fontSize);

            let yPosition = marginSize;

            // Add title
            doc.setFontSize(fontSize + 4);
            doc.setFont(undefined, 'bold');
            doc.text('Spokable PDF', marginSize, yPosition);
            yPosition += 10;

            doc.setFontSize(fontSize - 2);
            doc.setFont(undefined, 'normal');
            doc.text(`Converted from: ${originalFileName}`, marginSize, yPosition);
            yPosition += 10;

            doc.setFontSize(fontSize);

            // Add transformed content
            for (const batch of transformedBatches) {
                const text = batch.transformedText || batch.originalText;
                const lines = doc.splitTextToSize(text, maxWidth);

                for (const line of lines) {
                    if (yPosition > pageHeight - marginSize) {
                        doc.addPage();
                        yPosition = marginSize;
                    }

                    doc.text(line, marginSize, yPosition);
                    yPosition += fontSize * lineHeight * 0.35; // Convert to mm
                }

                yPosition += 5; // Space between batches
            }

            return doc;
        } catch (error) {
            console.error('PDF generation error:', error);
            throw new Error(ERROR_MESSAGES.GENERATION_FAILED);
        }
    }

    downloadPDF(doc, fileName) {
        const outputFileName = fileName.replace('.pdf', '_spokable.pdf');
        doc.save(outputFileName);
    }
}

// Main PDF Processor
export class PDFProcessor {
    constructor(settings) {
        this.settings = settings;
        this.extractor = new PDFExtractor();
        this.batcher = new TextBatcher(settings.batchSize);
        this.generator = new PDFGenerator();
        this.cancelled = false;
    }

    async process(file, apiClient, onProgress) {
        this.cancelled = false;

        try {
            // Stage 1: Extract text
            onProgress(10, PROCESSING_STAGES.EXTRACTING);
            const extractedText = await this.extractor.extractText(file);

            if (this.cancelled) throw new Error(ERROR_MESSAGES.PROCESSING_CANCELLED);

            // Stage 2: Create batches
            onProgress(20, PROCESSING_STAGES.BATCHING);
            const batches = this.batcher.createBatches(extractedText, this.settings.prompts);

            if (this.cancelled) throw new Error(ERROR_MESSAGES.PROCESSING_CANCELLED);

            // Stage 3: Process with Gemini
            onProgress(30, PROCESSING_STAGES.PROCESSING);

            const { BatchProcessor } = await import('./gemini-api.js');
            const batchProcessor = new BatchProcessor(apiClient, this.settings.turboMode);

            const transformedBatches = await batchProcessor.processBatches(
                batches,
                this.settings.model,
                (batchProgress, details) => {
                    const overallProgress = 30 + (batchProgress * 0.6); // 30-90%
                    onProgress(overallProgress, PROCESSING_STAGES.PROCESSING, details);
                }
            );

            if (this.cancelled) throw new Error(ERROR_MESSAGES.PROCESSING_CANCELLED);

            // Stage 4: Generate PDF
            onProgress(90, PROCESSING_STAGES.GENERATING);
            const doc = await this.generator.generatePDF(
                transformedBatches,
                file.name,
                this.settings.pdfStyle
            );

            onProgress(100, PROCESSING_STAGES.COMPLETE);

            return {
                doc: doc,
                fileName: file.name,
                batchCount: batches.length,
                tokenCount: batches.reduce((sum, b) => sum + this.batcher.estimateTokens(b.text), 0)
            };

        } catch (error) {
            console.error('Processing error:', error);
            throw error;
        }
    }

    cancel() {
        this.cancelled = true;
    }
}
