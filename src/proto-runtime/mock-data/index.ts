import { createMockDataProvider } from './registry';

export type { MockDataProvider, DatasetEntry, DatasetCollection } from './types';

export { createMockDataProvider };

const defaultMockData = createMockDataProvider({ datasets: {} });
export { defaultMockData };
