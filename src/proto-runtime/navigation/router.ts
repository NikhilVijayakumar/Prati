import type {
  NavigationConfig,
  NavigationState,
  NavigationListener,
  RouterEvent,
  ScreenDefinition,
  WorkflowDefinition,
  WorkflowStep,
} from '../types';
import type { NavigateOptions, RouterState } from './types';
import { createNavigationState, navigationStateReducer } from './navigation-state';

export class Router {
  private static instance: Router | null = null;
  private state: RouterState;
  private onHashChange: (() => void) | null = null;

  constructor(config: NavigationConfig) {
    const screens = new Map<string, ScreenDefinition>();
    for (const screen of config.screens) {
      screens.set(screen.id, screen);
    }

    const workflows = new Map<string, WorkflowDefinition>();
    for (const wf of config.workflows ?? []) {
      workflows.set(wf.id, wf);
    }

    const deepLinks = new Map<string, string>();
    if (config.deepLinks) {
      for (const [key, value] of Object.entries(config.deepLinks)) {
        deepLinks.set(key, value);
      }
    }

    this.state = {
      screens,
      workflows,
      defaultScreen: config.defaultScreen ?? (config.screens[0]?.id ?? ''),
      navigationState: createNavigationState(),
      listeners: new Set(),
      deepLinks,
    };
    Router.instance = this;
  }

  start(): void {
    this.onHashChange = this.handleHashChange.bind(this);
    window.addEventListener('hashchange', this.onHashChange);
    this.handleInitialNavigation();
  }

  stop(): void {
    if (this.onHashChange) {
      window.removeEventListener('hashchange', this.onHashChange);
      this.onHashChange = null;
    }
  }

  static getInstance(): Router | null {
    return Router.instance;
  }

  navigate(screenId: string, options?: NavigateOptions): void {
    const screen = this.state.screens.get(screenId);
    if (!screen) {
      this.emit('error', { error: `Screen not found: ${screenId}` });
      return;
    }
    const resolvedParams = options?.params ?? {};
    if (screen.params) {
      for (const param of screen.params) {
        if (resolvedParams[param] === undefined) {
          const hashParam = this.getHashParam(param);
          if (hashParam) resolvedParams[param] = hashParam;
        }
      }
    }
    this.state.navigationState = navigationStateReducer(
      this.state.navigationState,
      { type: 'NAVIGATE', screen: screenId, params: resolvedParams, replace: options?.replace },
    );
    window.location.hash = this.buildHash(screenId, resolvedParams);
    this.emit('navigation', { target: screenId, state: { ...this.state.navigationState } });
  }

  goBack(): void {
    if (this.state.navigationState.history.length < 2) return;
    this.state.navigationState = navigationStateReducer(this.state.navigationState, { type: 'GO_BACK' });
    const prev = this.state.navigationState.currentScreen;
    if (prev) {
      window.location.hash = this.buildHash(prev, this.state.navigationState.params);
      this.emit('navigation', { target: prev, state: { ...this.state.navigationState } });
    }
  }

  startWorkflow(workflowId: string, initialData?: Record<string, unknown>): void {
    const workflow = this.state.workflows.get(workflowId);
    if (!workflow || workflow.steps.length === 0) {
      this.emit('error', { error: `Workflow not found or empty: ${workflowId}` });
      return;
    }
    this.state.navigationState = navigationStateReducer(this.state.navigationState, {
      type: 'START_WORKFLOW',
      workflowId,
      initialData,
    });
    const firstStep = workflow.steps[0];
    this.navigate(firstStep.screen, { preserveWorkflow: true });
    this.emit('workflow-start', { target: workflowId, state: { ...this.state.navigationState } });
  }

  advanceWorkflow(stepData?: Record<string, unknown>): void {
    const workflow = this.state.workflows.get(this.state.navigationState.currentWorkflow ?? '');
    if (!workflow) {
      this.emit('error', { error: 'No active workflow' });
      return;
    }
    const nextStepIndex = this.state.navigationState.currentStep + 1;
    if (nextStepIndex >= workflow.steps.length) {
      this.state.navigationState = navigationStateReducer(this.state.navigationState, {
        type: 'COMPLETE_WORKFLOW',
      });
      if (workflow.onComplete) {
        this.navigate(workflow.onComplete);
      }
      this.emit('workflow-complete', {
        target: workflow.id,
        state: { ...this.state.navigationState },
      });
      return;
    }
    this.state.navigationState = navigationStateReducer(this.state.navigationState, {
      type: 'ADVANCE_WORKFLOW',
      stepData,
    });
    const nextStep = workflow.steps[nextStepIndex];
    this.navigate(nextStep.screen, { preserveWorkflow: true });
    this.emit('workflow-step', {
      target: workflow.id,
      state: { ...this.state.navigationState },
    });
  }

  navigateToWorkflowStep(workflowId: string, stepId: string): void {
    const workflow = this.state.workflows.get(workflowId);
    if (!workflow) {
      this.emit('error', { error: `Workflow not found: ${workflowId}` });
      return;
    }
    const stepIndex = workflow.steps.findIndex((s: WorkflowStep) => s.id === stepId);
    if (stepIndex < 0) {
      this.emit('error', { error: `Step not found: ${stepId}` });
      return;
    }
    this.state.navigationState.currentWorkflow = workflowId;
    this.state.navigationState.currentStep = stepIndex;
    this.navigate(workflow.steps[stepIndex].screen, { preserveWorkflow: true });
    this.emit('workflow-step', {
      target: workflowId,
      state: { ...this.state.navigationState },
    });
  }

  resolveDeepLink(link: string): void {
    const screenId = this.state.deepLinks.get(link);
    if (!screenId) {
      this.emit('error', { error: `Deep link not found: ${link}` });
      return;
    }
    this.navigate(screenId, { replace: true });
  }

  getCurrentScreen(): ScreenDefinition | undefined {
    const id = this.state.navigationState.currentScreen;
    return id ? this.state.screens.get(id) : undefined;
  }

  getCurrentWorkflow(): WorkflowDefinition | undefined {
    const id = this.state.navigationState.currentWorkflow;
    return id ? this.state.workflows.get(id) : undefined;
  }

  getNavigationState(): NavigationState {
    return { ...this.state.navigationState };
  }

  getScreen(id: string): ScreenDefinition | undefined {
    return this.state.screens.get(id);
  }

  getWorkflow(id: string): WorkflowDefinition | undefined {
    return this.state.workflows.get(id);
  }

  listScreens(): ScreenDefinition[] {
    return Array.from(this.state.screens.values());
  }

  listWorkflows(): WorkflowDefinition[] {
    return Array.from(this.state.workflows.values());
  }

  on(listener: NavigationListener): () => void {
    this.state.listeners.add(listener);
    return () => this.state.listeners.delete(listener);
  }

  off(listener: NavigationListener): void {
    this.state.listeners.delete(listener);
  }

  reset(): void {
    this.state.navigationState = createNavigationState();
    this.state.listeners.clear();
  }

  private handleInitialNavigation(): void {
    if (window.location.hash) {
      this.handleHashChange();
    } else {
      const defaultScreen = this.state.defaultScreen;
      if (defaultScreen) {
        this.navigate(defaultScreen, { replace: true });
      }
    }
  }

  private handleHashChange(): void {
    const hash = window.location.hash.slice(1);
    const screenId = hash.split('?')[0];
    const params = this.parseHashParams(hash);
    const screen = this.state.screens.get(screenId);
    if (screen) {
      this.state.navigationState = navigationStateReducer(this.state.navigationState, {
        type: 'NAVIGATE',
        screen: screenId,
        params,
        replace: true,
      });
      this.emit('navigation', { target: screenId, state: { ...this.state.navigationState } });
    } else if (this.state.defaultScreen) {
      this.navigate(this.state.defaultScreen, { replace: true });
    }
  }

  private buildHash(screenId: string, params: Record<string, string>): string {
    const paramString = Object.entries(params)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
    return paramString ? `#${screenId}?${paramString}` : `#${screenId}`;
  }

  private parseHashParams(hash: string): Record<string, string> {
    const params: Record<string, string> = {};
    const qIndex = hash.indexOf('?');
    if (qIndex >= 0) {
      const qs = hash.slice(qIndex + 1);
      for (const pair of qs.split('&')) {
        const [k, v] = pair.split('=').map(decodeURIComponent);
        if (k) params[k] = v ?? '';
      }
    }
    return params;
  }

  private getHashParam(name: string): string | undefined {
    return this.parseHashParams(window.location.hash.slice(1))[name];
  }

  private emit(type: RouterEvent['type'], extra: Partial<RouterEvent>): void {
    const event: RouterEvent = {
      type,
      timestamp: Date.now(),
      ...extra,
    };
    for (const listener of this.state.listeners) {
      try {
        listener(event);
      } catch {
        console.warn('[Router] Listener error');
      }
    }
  }
}

export function createRouter(config: NavigationConfig): Router {
  return new Router(config);
}
