import type { MockDataConfig } from '../types';

export type DatasetEntry = Record<string, unknown>;

export type DatasetCollection = Record<string, DatasetEntry[]>;

export type MockDataProvider = {
  getDataset<T extends DatasetEntry = DatasetEntry>(name: string): T[];
  getEntry<T extends DatasetEntry = DatasetEntry>(dataset: string, id: string): T | undefined;
  addEntry(dataset: string, entry: DatasetEntry): void;
  updateEntry(dataset: string, id: string, entry: Partial<DatasetEntry>): boolean;
  removeEntry(dataset: string, id: string): boolean;
  listDatasets(): string[];
  reset(): void;
};

export type CreateMockDataOptions = MockDataConfig;
