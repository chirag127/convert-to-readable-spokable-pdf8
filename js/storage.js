// Storage Management (LocalStorage and IndexedDB)
import { CONFIG } from './config.js';

// LocalStorage wrapper
export const LocalStorageManager = {
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('LocalStorage get error:', error);
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('LocalStorage set error:', error);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('LocalStorage remove error:', error);
            return false;
        }
    },

    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('LocalStorage clear error:', error);
            return false;
        }
    }
};

// IndexedDB wrapper
export class IndexedDBManager {
    constructor() {
        this.db = null;
        this.dbName = CONFIG.INDEXEDDB.NAME;
        this.version = CONFIG.INDEXEDDB.VERSION;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create object stores if they don't exist
                if (!db.objectStoreNames.contains(CONFIG.INDEXEDDB.STORES.FILES)) {
                    db.createObjectStore(CONFIG.INDEXEDDB.STORES.FILES, { keyPath: 'id', autoIncrement: true });
                }

                if (!db.objectStoreNames.contains(CONFIG.INDEXEDDB.STORES.QUEUE)) {
                    db.createObjectStore(CONFIG.INDEXEDDB.STORES.QUEUE, { keyPath: 'id', autoIncrement: true });
                }
            };
        });
    }

    async add(storeName, data) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async get(storeName, id) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getAll(storeName) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async update(storeName, data) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async delete(storeName, id) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async clear(storeName) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}

// Settings Manager
export class SettingsManager {
    constructor() {
        this.settings = this.load();
    }

    load() {
        const saved = LocalStorageManager.get(CONFIG.STORAGE_KEYS.SETTINGS);
        return saved ? { ...CONFIG.DEFAULT_SETTINGS, ...saved } : { ...CONFIG.DEFAULT_SETTINGS };
    }

    save(settings) {
        this.settings = { ...this.settings, ...settings };
        return LocalStorageManager.set(CONFIG.STORAGE_KEYS.SETTINGS, this.settings);
    }

    get(key) {
        return key ? this.settings[key] : this.settings;
    }

    reset() {
        this.settings = { ...CONFIG.DEFAULT_SETTINGS };
        return LocalStorageManager.set(CONFIG.STORAGE_KEYS.SETTINGS, this.settings);
    }

    getApiKey() {
        return this.settings.apiKey;
    }

    getBackupApiKey() {
        return this.settings.backupApiKey;
    }

    hasApiKey() {
        return !!this.settings.apiKey;
    }
}
