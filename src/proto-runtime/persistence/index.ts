import type { PersistenceConfig, PersistenceKey } from '../types';
import type { StorageAdapter, PersistenceResult, CreatePersistenceOptions } from './types';
import { createStorageAdapter } from './storage';

export type { StorageAdapter, PersistenceResult, CreatePersistenceOptions, StorageBackend } from './types';

export class Persistence {
  private adapter: StorageAdapter;
  private config: PersistenceConfig;

  constructor(config: PersistenceConfig) {
    this.config = config;
    this.adapter = createStorageAdapter(
      config.storage ?? 'localStorage',
      config.namespace,
    );
  }

  get<T>(key: PersistenceKey): PersistenceResult<T> {
    return this.adapter.getItem<T>(key);
  }

  set<T>(key: PersistenceKey, value: T): PersistenceResult<void> {
    return this.adapter.setItem(key, value);
  }

  remove(key: PersistenceKey): PersistenceResult<void> {
    return this.adapter.removeItem(key);
  }

  clear(): PersistenceResult<void> {
    return this.adapter.clear();
  }

  keys(): string[] {
    return this.adapter.keys();
  }

  isAvailable(): boolean {
    return this.adapter.isAvailable();
  }

  getConfig(): PersistenceConfig {
    return { ...this.config };
  }
}

export function createPersistence(config: CreatePersistenceOptions): Persistence {
  return new Persistence(config);
}

const defaultPersistence = new Persistence({
  namespace: 'proto',
  storage: 'localStorage',
});

export { defaultPersistence };
