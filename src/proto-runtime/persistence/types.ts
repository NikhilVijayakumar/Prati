import type { PersistenceConfig } from '../types';

export type StorageBackend = 'localStorage' | 'sessionStorage' | 'memory';

export type PersistenceResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export interface StorageAdapter {
  getItem<T>(key: string): PersistenceResult<T>;
  setItem<T>(key: string, value: T): PersistenceResult<void>;
  removeItem(key: string): PersistenceResult<void>;
  clear(): PersistenceResult<void>;
  keys(): string[];
  isAvailable(): boolean;
}

export type CreatePersistenceOptions = PersistenceConfig;
