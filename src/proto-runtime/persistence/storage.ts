import type { StorageAdapter, PersistenceResult, StorageBackend } from './types';

class MemoryStorage implements StorageAdapter {
  private store = new Map<string, string>();

  getItem<T>(key: string): PersistenceResult<T> {
    const raw = this.store.get(key);
    if (raw === undefined) {
      return { success: false, error: `Key not found: ${key}` };
    }
    try {
      return { success: true, data: JSON.parse(raw) as T };
    } catch {
      return { success: true, data: raw as unknown as T };
    }
  }

  setItem<T>(key: string, value: T): PersistenceResult<void> {
    try {
      this.store.set(key, JSON.stringify(value));
      return { success: true };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }

  removeItem(key: string): PersistenceResult<void> {
    this.store.delete(key);
    return { success: true };
  }

  clear(): PersistenceResult<void> {
    this.store.clear();
    return { success: true };
  }

  keys(): string[] {
    return Array.from(this.store.keys());
  }

  isAvailable(): boolean {
    return true;
  }
}

class WebStorageAdapter implements StorageAdapter {
  private backend: StorageBackend;
  private namespace: string;

  constructor(backend: StorageBackend, namespace: string) {
    this.backend = backend;
    this.namespace = namespace;
  }

  private get storage(): Storage | null {
    try {
      if (this.backend === 'localStorage') return localStorage;
      if (this.backend === 'sessionStorage') return sessionStorage;
      return null;
    } catch {
      return null;
    }
  }

  private prefixed(key: string): string {
    return `${this.namespace}:${key}`;
  }

  getItem<T>(key: string): PersistenceResult<T> {
    const storage = this.storage;
    if (!storage) return { success: false, error: 'Storage unavailable' };
    try {
      const raw = storage.getItem(this.prefixed(key));
      if (raw === null) return { success: false, error: `Key not found: ${key}` };
      return { success: true, data: JSON.parse(raw) as T };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }

  setItem<T>(key: string, value: T): PersistenceResult<void> {
    const storage = this.storage;
    if (!storage) return { success: false, error: 'Storage unavailable' };
    try {
      storage.setItem(this.prefixed(key), JSON.stringify(value));
      return { success: true };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }

  removeItem(key: string): PersistenceResult<void> {
    const storage = this.storage;
    if (!storage) return { success: false, error: 'Storage unavailable' };
    try {
      storage.removeItem(this.prefixed(key));
      return { success: true };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }

  clear(): PersistenceResult<void> {
    const storage = this.storage;
    if (!storage) return { success: false, error: 'Storage unavailable' };
    try {
      const prefix = `${this.namespace}:`;
      const toRemove: string[] = [];
      for (let i = 0; i < storage.length; i++) {
        const k = storage.key(i);
        if (k?.startsWith(prefix)) toRemove.push(k);
      }
      toRemove.forEach((k) => storage.removeItem(k));
      return { success: true };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }

  keys(): string[] {
    const storage = this.storage;
    if (!storage) return [];
    const prefix = `${this.namespace}:`;
    const result: string[] = [];
    for (let i = 0; i < storage.length; i++) {
      const k = storage.key(i);
      if (k?.startsWith(prefix)) result.push(k.slice(prefix.length));
    }
    return result;
  }

  isAvailable(): boolean {
    return this.storage !== null;
  }
}

export function createStorageAdapter(
  backend: StorageBackend,
  namespace: string,
): StorageAdapter {
  if (backend === 'memory') return new MemoryStorage();
  return new WebStorageAdapter(backend, namespace);
}
