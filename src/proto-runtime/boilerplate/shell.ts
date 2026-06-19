import type { ProtoRuntimeConfig, NavigationState } from '../types';
import { Router } from '../navigation/router';
import { Persistence } from '../persistence';
import { createMockDataProvider } from '../mock-data/registry';
import type { MockDataProvider } from '../mock-data/types';

export type ShellState = 'uninitialized' | 'initializing' | 'ready' | 'error';

export type Shell = {
  config: ProtoRuntimeConfig;
  state: ShellState;
  router: Router | null;
  persistence: Persistence | null;
  mockData: MockDataProvider | null;
  start(): void;
  stop(): void;
  getState(): ShellState;
  getNavigationState(): NavigationState | null;
};

export function createShell(config: ProtoRuntimeConfig): Shell {
  let state: ShellState = 'uninitialized';
  let router: Router | null = null;
  let persistence: Persistence | null = null;
  let mockData: MockDataProvider | null = null;

  const shell: Shell = {
    config,
    state,
    router,
    persistence,
    mockData,

    start(): void {
      state = 'initializing';

      try {
        if (config.persistence) {
          persistence = new Persistence(config.persistence);
        }

        if (config.mockData) {
          mockData = createMockDataProvider(config.mockData);
        }

        if (config.navigation) {
          router = new Router(config.navigation);
          router.start();
        }

        state = 'ready';
      } catch (e) {
        state = 'error';
        console.error('[Proto Runtime] Shell initialization failed:', e);
      }
    },

    stop(): void {
      if (router) {
        router.stop();
        router = null;
      }
      state = 'uninitialized';
    },

    getState(): ShellState {
      return state;
    },

    getNavigationState(): NavigationState | null {
      return router?.getNavigationState() ?? null;
    },
  };

  return shell;
}
