/**
 * TokTube - IndexedDB Database Engine (TokDatabase)
 * A true relational/object-store browser database providing structured persistence,
 * indexing, transactions, and JSON backup/restore.
 */

import { INITIAL_DATA } from './data.js';

const DB_NAME = 'TokTubeDB';
const DB_VERSION = 1;

export class TokDatabase {
  constructor() {
    this.db = null;
    this.initPromise = this.open();
  }

  open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;

        // Store: Videos (16:9 YouTube videos)
        if (!db.objectStoreNames.contains('videos')) {
          const videoStore = db.createObjectStore('videos', { keyPath: 'id' });
          videoStore.createIndex('category', 'category', { unique: false });
          videoStore.createIndex('channelId', 'channel.id', { unique: false });
        }

        // Store: Reels (9:16 TikTok reels)
        if (!db.objectStoreNames.contains('reels')) {
          const reelStore = db.createObjectStore('reels', { keyPath: 'id' });
          reelStore.createIndex('soundTitle', 'soundTitle', { unique: false });
          reelStore.createIndex('channelId', 'channel.id', { unique: false });
        }

        // Store: Comments & Replies
        if (!db.objectStoreNames.contains('comments')) {
          const commentStore = db.createObjectStore('comments', { keyPath: 'id' });
          commentStore.createIndex('videoId', 'videoId', { unique: false });
          commentStore.createIndex('parentId', 'parentId', { unique: false });
        }

        // Store: Channels
        if (!db.objectStoreNames.contains('channels')) {
          db.createObjectStore('channels', { keyPath: 'id' });
        }

        // Store: Notifications
        if (!db.objectStoreNames.contains('notifications')) {
          const notifStore = db.createObjectStore('notifications', { keyPath: 'id' });
          notifStore.createIndex('read', 'read', { unique: false });
        }

        // Store: User Data (Profile, History, Likes, Bookmarks)
        if (!db.objectStoreNames.contains('userData')) {
          db.createObjectStore('userData', { keyPath: 'key' });
        }
      };

      request.onsuccess = async (e) => {
        this.db = e.target.result;
        await this.seedInitialData();
        resolve(this.db);
      };

      request.onerror = (e) => {
        console.error('IndexedDB open error:', e.target.error);
        reject(e.target.error);
      };
    });
  }

  async ready() {
    return this.initPromise;
  }

  // Seed default data if stores are empty
  async seedInitialData() {
    const videoCount = await this.count('videos');
    if (videoCount === 0) {
      for (const v of INITIAL_DATA.youtubeVideos) {
        await this.put('videos', v);
      }
    }

    const reelCount = await this.count('reels');
    if (reelCount === 0) {
      for (const r of INITIAL_DATA.tiktokReels) {
        await this.put('reels', r);
      }
    }

    const notifCount = await this.count('notifications');
    if (notifCount === 0 && INITIAL_DATA.notifications) {
      for (const n of INITIAL_DATA.notifications) {
        await this.put('notifications', n);
      }
    }
  }

  // Generic Get All
  async getAll(storeName) {
    await this.ready();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  // Generic Get By Key
  async get(storeName, key) {
    await this.ready();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  // Generic Put (Insert or Update)
  async put(storeName, item) {
    await this.ready();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(item);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  // Generic Delete
  async delete(storeName, key) {
    await this.ready();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.delete(key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  }

  // Count items in a store
  async count(storeName) {
    await this.ready();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.count();
      req.onsuccess = () => resolve(req.result || 0);
      req.onerror = () => reject(req.error);
    });
  }

  // Clear all records in a store
  async clear(storeName) {
    await this.ready();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.clear();
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  }

  // Export full database to JSON string (for backups or debugging)
  async exportJSON() {
    await this.ready();
    const backup = {};
    const stores = ['videos', 'reels', 'comments', 'notifications', 'userData'];
    for (const name of stores) {
      backup[name] = await this.getAll(name);
    }
    return JSON.stringify(backup, null, 2);
  }

  // Import database from JSON object
  async importJSON(jsonData) {
    await this.ready();
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    for (const storeName of Object.keys(data)) {
      if (this.db.objectStoreNames.contains(storeName)) {
        await this.clear(storeName);
        for (const item of data[storeName]) {
          await this.put(storeName, item);
        }
      }
    }
  }
}

export const db = new TokDatabase();
