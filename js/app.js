// Main Application Logic
import { CONFIG, ERROR_MESSAGES } from './config.js';
import { SettingsManager } from './storage.js';
import { UIManager, initDragAndDrop, initWalkthrough } from './ui-manager.js';
import { GeminiAPIClient } from './gemini-api.js';
import { PDFProcessor } from './pdf-engine.js';

class SpokablePDFApp {
    constructor() {
        this.settingsManager = new SettingsManager();
        this.uiManager = new UIManager();
        this.currentFile = null;
        this.processor = null;
        this.apiClient = null;
        this.processingResult = null;
    }

    init() {
        this.uiManager.init();
        initWalkthrough();

        // Initialize drag and drop
        initDragAndDrop('dropZone', 'fileInput', (file) => this.handleFileSelected(file));

        // Process button
        const processBtn = document.getElementById('processBtn');
        if (processBtn) {
            processBtn.addEventListener('click', () => this.startProcessing());
        }

        // Cancel button
        const cancelBtn = document.getElementById('cancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.cancelProcessing());
        }

        // Download button
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadResult());
        }

        // Process another button
        const processAnotherBtn = document.getElementById('processAnotherBtn');
        if (processAnotherBtn) {
            processAnotherBtn.addEventListener('click', () => this.resetApp());
        }
    }

    handleFileSelected(file) {
        this.currentFile = file;
        this.uiManager.displayFileInfo(file);
    }

    async startProcessing() {
        if (!this.currentFile) {
            this.uiManager.showError('Please select a PDF file first.');
            return;
        }

        // Check API key
        if (!this.settingsManager.hasApiKey()) {
            this.uiManager.showError(ERROR_MESSAGES.NO_API_KEY);
            window.location.href = 'settings.html';
            return;
        }

        try {
            // Hide file info and show progress
            this.uiManager.hideSection('fileInfo');
            const dropZone = document.getElementById('dropZone');
            if (dropZone) dropZone.style.display = 'none';
            this.uiManager.showSection('progressSection');

            // Initialize API client
            const settings = this.settingsManager.get();
            this.apiClient = new GeminiAPIClient(
                settings.apiKey,
                settings.backupApiKey
            );

            // Initialize processor
            this.processor = new PDFProcessor(settings);

            // Start processing
            this.processingResult = await this.processor.process(
                this.currentFile,
                this.apiClient,
                (progress, stage, details) => {
                    this.uiManager.updateProgress(progress, stage, details);
                }
            );

            // Show success
            this.showSuccess();

        } catch (error) {
            console.error('Processing failed:', error);
            this.uiManager.showError(error.message || 'Processing failed. Please try again.');
            this.resetApp();
        }
    }

    cancelProcessing() {
        if (this.processor) {
            this.processor.cancel();
        }
        this.resetApp();
    }

    showSuccess() {
        this.uiManager.hideSection('progressSection');
        this.uiManager.showSection('resultSection');

        const message = `Successfully converted ${this.processingResult.batchCount} batches (≈${this.processingResult.tokenCount.toLocaleString()} tokens)`;
        this.uiManager.showSuccess(message);
    }

    downloadResult() {
        if (this.processingResult && this.processingResult.doc) {
            const generator = this.processor.generator;
            generator.downloadPDF(this.processingResult.doc, this.processingResult.fileName);
        }
    }

    resetApp() {
        this.currentFile = null;
        this.processor = null;
        this.processingResult = null;
        this.uiManager.resetUI();

        const dropZone = document.getElementById('dropZone');
        if (dropZone) dropZone.style.display = 'block';
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new SpokablePDFApp();
    app.init();
});
