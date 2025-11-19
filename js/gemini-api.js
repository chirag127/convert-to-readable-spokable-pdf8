// Gemini API Client with Rate Limiting and Retry Logic
import { CONFIG, ERROR_MESSAGES } from './config.js';

export class GeminiAPIClient {
    constructor(apiKey, backupApiKey = null) {
        this.apiKey = apiKey;
        this.backupApiKey = backupApiKey;
        this.currentKey = apiKey;
        this.requestCount = 0;
        this.lastRequestTime = 0;
        this.usingBackup = false;
    }

    async generateContent(prompt, model = 'gemini-2.5-flash', retryCount = 0, maxRetries = 3) {
        const url = `${CONFIG.GEMINI_API_BASE_URL}/${model}:generateContent?key=${this.currentKey}`;

        const payload = {
            contents: [{
                parts: [{
                    text: `${CONFIG.SYSTEM_PROMPT}\n\n${prompt}`
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192
            }
        };

        try {
            // Rate limiting check
            await this.checkRateLimit();

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                // Handle rate limiting (429)
                if (response.status === 429) {
                    if (retryCount < maxRetries) {
                        const delay = this.calculateBackoffDelay(retryCount);
                        console.log(`Rate limit hit. Retrying in ${delay}ms...`);
                        await this.sleep(delay);

                        // Try backup key if available and not already using it
                        if (this.backupApiKey && !this.usingBackup) {
                            console.log('Switching to backup API key...');
                            this.currentKey = this.backupApiKey;
                            this.usingBackup = true;
                        }

                        return this.generateContent(prompt, model, retryCount + 1, maxRetries);
                    }
                    throw new Error(ERROR_MESSAGES.RATE_LIMIT);
                }

                // Handle other errors
                throw new Error(errorData.error?.message || ERROR_MESSAGES.API_ERROR);
            }

            const data = await response.json();

            // Extract generated text
            if (data.candidates && data.candidates.length > 0) {
                const candidate = data.candidates[0];
                if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                    return candidate.content.parts[0].text;
                }
            }

            throw new Error('No content generated from API');

        } catch (error) {
            if (error.message.includes('fetch') || error.message.includes('network')) {
                if (retryCount < maxRetries) {
                    const delay = this.calculateBackoffDelay(retryCount);
                    console.log(`Network error. Retrying in ${delay}ms...`);
                    await this.sleep(delay);
                    return this.generateContent(prompt, model, retryCount + 1, maxRetries);
                }
                throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
            }
            throw error;
        }
    }

    async checkRateLimit() {
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        const minInterval = 60000 / CONFIG.RATE_LIMIT.FREE_TIER_RPM; // ms between requests

        if (timeSinceLastRequest < minInterval) {
            const waitTime = minInterval - timeSinceLastRequest;
            await this.sleep(waitTime);
        }

        this.lastRequestTime = Date.now();
        this.requestCount++;
    }

    calculateBackoffDelay(retryCount) {
        const baseDelay = CONFIG.RATE_LIMIT.RETRY_DELAY_MS;
        const delay = Math.min(
            baseDelay * Math.pow(2, retryCount),
            CONFIG.RATE_LIMIT.MAX_RETRY_DELAY_MS
        );
        return delay;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    resetRequestCount() {
        this.requestCount = 0;
    }

    getRequestCount() {
        return this.requestCount;
    }
}

// Batch Processing with Turbo Mode
export class BatchProcessor {
    constructor(apiClient, turboMode = false) {
        this.apiClient = apiClient;
        this.turboMode = turboMode;
        this.cancelled = false;
    }

    async processBatches(batches, model, onProgress) {
        this.cancelled = false;
        const results = [];

        if (this.turboMode) {
            // Parallel processing
            const promises = batches.map((batch, index) =>
                this.processBatch(batch, model, index, batches.length, onProgress)
            );

            const batchResults = await Promise.all(promises);
            results.push(...batchResults);
        } else {
            // Sequential processing
            for (let i = 0; i < batches.length; i++) {
                if (this.cancelled) {
                    throw new Error(ERROR_MESSAGES.PROCESSING_CANCELLED);
                }

                const result = await this.processBatch(batches[i], model, i, batches.length, onProgress);
                results.push(result);
            }
        }

        return results;
    }

    async processBatch(batch, model, index, total, onProgress) {
        if (this.cancelled) {
            throw new Error(ERROR_MESSAGES.PROCESSING_CANCELLED);
        }

        const progress = ((index + 1) / total) * 100;
        const details = `Processing batch ${index + 1} of ${total}`;

        if (onProgress) {
            onProgress(progress, details);
        }

        const result = await this.apiClient.generateContent(batch.text, model);

        return {
            ...batch,
            transformedText: result
        };
    }

    cancel() {
        this.cancelled = true;
    }
}
