// Configuration and Constants
export const CONFIG = {
    GEMINI_API_BASE_URL: 'https://generativelanguage.googleapis.com/v1beta/models',

    MODELS: [
        { id: 'gemini-3-pro-preview', name: 'Gemini 3 Pro Preview', series: '3.0' },
        { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', series: '2.5', recommended: true },
        { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', series: '2.5' },
        { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash Lite', series: '2.5' },
        { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', series: '2.0' }
    ],

    DEFAULT_SETTINGS: {
        apiKey: '',
        backupApiKey: '',
        model: 'gemini-2.5-flash',
        batchSize: 10000,
        turboMode: false,
        maxRetries: 3,

        prompts: {
            code: 'Describe this code in natural language suitable for text-to-speech. Explain what the code does conceptually without reading it line by line. Focus on the purpose and logic.',
            table: 'Convert this table into a narrative format suitable for text-to-speech. Describe the data relationships and key insights in a flowing, conversational manner.',
            math: 'Convert mathematical notation into spoken words. For example, \'x^2\' becomes \'x squared\'. Make equations readable and understandable when spoken aloud.',
            general: 'Convert the following text into a natural, spoken format optimized for text-to-speech systems. Maintain accuracy while making it conversational and easy to listen to.'
        },

        pdfStyle: {
            fontSize: 12,
            lineHeight: 1.5,
            marginSize: 20
        }
    },

    SYSTEM_PROMPT: 'You are an expert at converting technical documentation into natural, spoken language optimized for text-to-speech systems. Convert the following text into a natural, spoken format. Maintain accuracy while making it conversational. Do not read code line by line. Explain the logic.',

    RATE_LIMIT: {
        FREE_TIER_RPM: 15,
        FREE_TIER_RPD: 1500,
        RETRY_DELAY_MS: 1000,
        MAX_RETRY_DELAY_MS: 30000
    },

    STORAGE_KEYS: {
        SETTINGS: 'spokable_pdf_settings',
        DARK_MODE: 'spokable_pdf_dark_mode',
        WALKTHROUGH_SEEN: 'spokable_pdf_walkthrough_seen'
    },

    INDEXEDDB: {
        NAME: 'SpokablePDFDB',
        VERSION: 1,
        STORES: {
            FILES: 'files',
            QUEUE: 'processing_queue'
        }
    }
};

export const ERROR_MESSAGES = {
    NO_API_KEY: 'Please configure your Gemini API key in Settings first.',
    INVALID_PDF: 'Invalid PDF file. Please select a valid PDF document.',
    EXTRACTION_FAILED: 'Failed to extract text from PDF. The file may be corrupted or image-based.',
    API_ERROR: 'API request failed. Please check your API key and try again.',
    RATE_LIMIT: 'Rate limit exceeded. Retrying with exponential backoff...',
    NETWORK_ERROR: 'Network error. Please check your internet connection.',
    PROCESSING_CANCELLED: 'Processing cancelled by user.',
    GENERATION_FAILED: 'Failed to generate output PDF. Please try again.'
};

export const PROCESSING_STAGES = {
    INITIALIZING: 'Initializing...',
    EXTRACTING: 'Extracting text from PDF...',
    BATCHING: 'Creating processing batches...',
    PROCESSING: 'Processing with Gemini AI...',
    GENERATING: 'Generating spokable PDF...',
    COMPLETE: 'Conversion complete!'
};
