// UI Management and Dark Mode
import { CONFIG } from './config.js';
import { LocalStorageManager } from './storage.js';

export class UIManager {
    constructor() {
        this.progressFill = null;
        this.progressText = null;
        this.progressStage = null;
        this.progressDetails = null;
    }

    init() {
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.progressStage = document.getElementById('progressStage');
        this.progressDetails = document.getElementById('progressDetails');
    }

    updateProgress(percentage, stage, details = '') {
        if (this.progressFill) {
            this.progressFill.style.width = `${percentage}%`;
        }
        if (this.progressText) {
            this.progressText.textContent = `${Math.round(percentage)}%`;
        }
        if (this.progressStage && stage) {
            this.progressStage.textContent = stage;
        }
        if (this.progressDetails) {
            this.progressDetails.textContent = details;
        }
    }

    showSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'block';
        }
    }

    hideSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'none';
        }
    }

    showError(message) {
        alert(message); // Simple error display, can be enhanced with custom modal
    }

    showSuccess(message) {
        const resultMessage = document.getElementById('resultMessage');
        if (resultMessage) {
            resultMessage.textContent = message;
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    displayFileInfo(file) {
        const fileName = document.getElementById('fileName');
        const fileSize = document.getElementById('fileSize');
        const fileInfo = document.getElementById('fileInfo');

        if (fileName) fileName.textContent = file.name;
        if (fileSize) fileSize.textContent = this.formatFileSize(file.size);
        if (fileInfo) fileInfo.style.display = 'flex';
    }

    resetUI() {
        this.hideSection('progressSection');
        this.hideSection('resultSection');
        this.hideSection('fileInfo');

        const dropZone = document.getElementById('dropZone');
        if (dropZone) dropZone.style.display = 'block';
    }
}

// Dark Mode Management
export function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = LocalStorageManager.get(CONFIG.STORAGE_KEYS.DARK_MODE, false);

    // Apply saved preference
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Toggle handler
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const newMode = document.body.classList.contains('dark-mode');
            LocalStorageManager.set(CONFIG.STORAGE_KEYS.DARK_MODE, newMode);
        });
    }
}

// Drag and Drop Handler
export function initDragAndDrop(dropZoneId, fileInputId, onFileSelected) {
    const dropZone = document.getElementById(dropZoneId);
    const fileInput = document.getElementById(fileInputId);

    if (!dropZone || !fileInput) return;

    // Click to select
    dropZone.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
            fileInput.click();
        }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            onFileSelected(file);
        }
    });

    // Drag events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('drag-over');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('drag-over');
        }, false);
    });

    dropZone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type === 'application/pdf') {
            onFileSelected(files[0]);
        }
    }, false);
}

// Walkthrough Management
export function initWalkthrough() {
    const walkthroughSeen = LocalStorageManager.get(CONFIG.STORAGE_KEYS.WALKTHROUGH_SEEN, false);
    const walkthrough = document.getElementById('welcomeWalkthrough');

    if (!walkthroughSeen && walkthrough) {
        walkthrough.style.display = 'block';

        const closeBtn = walkthrough.querySelector('.close-btn');
        const gotItBtn = walkthrough.querySelector('.btn-primary');

        const hideWalkthrough = () => {
            walkthrough.style.display = 'none';
            LocalStorageManager.set(CONFIG.STORAGE_KEYS.WALKTHROUGH_SEEN, true);
        };

        if (closeBtn) closeBtn.addEventListener('click', hideWalkthrough);
        if (gotItBtn) gotItBtn.addEventListener('click', hideWalkthrough);
    }
}

// Initialize on all pages
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
});
