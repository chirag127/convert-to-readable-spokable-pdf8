// Settings Page Logic
import { CONFIG } from './config.js';
import { SettingsManager } from './storage.js';
import { initDarkMode } from './ui-manager.js';

class SettingsPage {
    constructor() {
        this.settingsManager = new SettingsManager();
    }

    init() {
        initDarkMode();
        this.loadSettings();
        this.attachEventListeners();
    }

    loadSettings() {
        const settings = this.settingsManager.get();

        // API Configuration
        this.setValue('apiKey', settings.apiKey);
        this.setValue('backupApiKey', settings.backupApiKey);
        this.setValue('modelSelect', settings.model);

        // Performance
        this.setValue('batchSize', settings.batchSize);
        this.setValue('batchSizeValue', settings.batchSize);
        this.setChecked('turboMode', settings.turboMode);
        this.setValue('maxRetries', settings.maxRetries);

        // Prompts
        this.setValue('codePrompt', settings.prompts.code);
        this.setValue('tablePrompt', settings.prompts.table);
        this.setValue('mathPrompt', settings.prompts.math);
        this.setValue('generalPrompt', settings.prompts.general);

        // PDF Styling
        this.setValue('fontSize', settings.pdfStyle.fontSize);
        this.setValue('lineHeight', settings.pdfStyle.lineHeight);
        this.setValue('marginSize', settings.pdfStyle.marginSize);
    }

    attachEventListeners() {
        // Batch size slider
        const batchSize = document.getElementById('batchSize');
        const batchSizeValue = document.getElementById('batchSizeValue');
        if (batchSize && batchSizeValue) {
            batchSize.addEventListener('input', (e) => {
                batchSizeValue.textContent = e.target.value;
            });
        }

        // Save button
        const saveBtn = document.getElementById('saveSettingsBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveSettings());
        }

        // Reset button
        const resetBtn = document.getElementById('resetSettingsBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetSettings());
        }
    }

    saveSettings() {
        const settings = {
            apiKey: this.getValue('apiKey'),
            backupApiKey: this.getValue('backupApiKey'),
            model: this.getValue('modelSelect'),
            batchSize: parseInt(this.getValue('batchSize')),
            turboMode: this.getChecked('turboMode'),
            maxRetries: parseInt(this.getValue('maxRetries')),
            prompts: {
                code: this.getValue('codePrompt'),
                table: this.getValue('tablePrompt'),
                math: this.getValue('mathPrompt'),
                general: this.getValue('generalPrompt')
            },
            pdfStyle: {
                fontSize: parseInt(this.getValue('fontSize')),
                lineHeight: parseFloat(this.getValue('lineHeight')),
                marginSize: parseInt(this.getValue('marginSize'))
            }
        };

        if (this.settingsManager.save(settings)) {
            this.showNotification('Settings saved successfully!');
        } else {
            alert('Failed to save settings. Please try again.');
        }
    }

    resetSettings() {
        if (confirm('Are you sure you want to reset all settings to defaults?')) {
            this.settingsManager.reset();
            this.loadSettings();
            this.showNotification('Settings reset to defaults!');
        }
    }

    showNotification(message) {
        const notification = document.getElementById('saveNotification');
        if (notification) {
            notification.textContent = `✓ ${message}`;
            notification.style.display = 'block';

            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        }
    }

    getValue(id) {
        const element = document.getElementById(id);
        return element ? element.value : '';
    }

    setValue(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.value = value;
        }
    }

    getChecked(id) {
        const element = document.getElementById(id);
        return element ? element.checked : false;
    }

    setChecked(id, checked) {
        const element = document.getElementById(id);
        if (element) {
            element.checked = checked;
        }
    }
}

// Initialize settings page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const settingsPage = new SettingsPage();
    settingsPage.init();
});
