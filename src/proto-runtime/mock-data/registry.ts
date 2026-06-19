import type { MockDataConfig } from '../types';
import type { MockDataProvider, DatasetEntry, DatasetCollection } from './types';

export function createMockDataProvider(config: MockDataConfig): MockDataProvider {
  const initial: DatasetCollection = {};
  for (const [name, entries] of Object.entries(config.datasets)) {
    initial[name] = entries.map((e, i) => {
      const entry = e as DatasetEntry;
      if (entry.id === undefined || entry.id === null) {
        entry.id = String(i + 1);
      }
      return entry;
    });
  }

  let datasets: DatasetCollection = deepClone(initial);

  return {
    getDataset<T extends DatasetEntry = DatasetEntry>(name: string): T[] {
      return (datasets[name] ?? []) as T[];
    },

    getEntry<T extends DatasetEntry = DatasetEntry>(dataset: string, id: string): T | undefined {
      return datasets[dataset]?.find((e) => e.id === id) as T | undefined;
    },

    addEntry(dataset: string, entry: DatasetEntry): void {
      if (!datasets[dataset]) datasets[dataset] = [];
      if (!entry.id) entry.id = String(Date.now());
      datasets[dataset].push(entry);
    },

    updateEntry(dataset: string, id: string, entry: Partial<DatasetEntry>): boolean {
      const index = datasets[dataset]?.findIndex((e) => e.id === id);
      if (index === undefined || index < 0) return false;
      datasets[dataset][index] = { ...datasets[dataset][index], ...entry };
      return true;
    },

    removeEntry(dataset: string, id: string): boolean {
      const index = datasets[dataset]?.findIndex((e) => e.id === id);
      if (index === undefined || index < 0) return false;
      datasets[dataset].splice(index, 1);
      return true;
    },

    listDatasets(): string[] {
      return Object.keys(datasets);
    },

    reset(): void {
      datasets = deepClone(initial);
    },
  };
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
