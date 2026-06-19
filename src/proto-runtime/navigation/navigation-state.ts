import type { NavigationState } from '../types';

export function createNavigationState(initial?: Partial<NavigationState>): NavigationState {
  return {
    currentScreen: null,
    currentWorkflow: null,
    currentStep: 0,
    history: [],
    params: {},
    workflowData: {},
    ...initial,
  };
}

export function navigationStateReducer(
  state: NavigationState,
  action: NavigationStateAction,
): NavigationState {
  switch (action.type) {
    case 'NAVIGATE': {
      const newHistory =
        action.replace && state.history.length > 0
          ? [...state.history.slice(0, -1), action.screen]
          : [...state.history, action.screen];
      return {
        ...state,
        currentScreen: action.screen,
        history: newHistory,
        params: action.params ?? {},
      };
    }
    case 'GO_BACK': {
      if (state.history.length < 2) return state;
      const newHistory = state.history.slice(0, -1);
      return {
        ...state,
        currentScreen: newHistory[newHistory.length - 1] ?? state.currentScreen,
        history: newHistory,
      };
    }
    case 'START_WORKFLOW': {
      return {
        ...state,
        currentWorkflow: action.workflowId,
        currentStep: 0,
        workflowData: { ...state.workflowData, ...(action.initialData ?? {}) },
      };
    }
    case 'ADVANCE_WORKFLOW': {
      return {
        ...state,
        currentStep: state.currentStep + 1,
        workflowData: { ...state.workflowData, ...(action.stepData ?? {}) },
      };
    }
    case 'COMPLETE_WORKFLOW': {
      return {
        ...state,
        currentWorkflow: null,
        currentStep: 0,
        workflowData: {},
      };
    }
    case 'SET_PARAMS': {
      return {
        ...state,
        params: { ...state.params, ...action.params },
      };
    }
    case 'RESET': {
      return createNavigationState(action.initial);
    }
    default:
      return state;
  }
}

type NavigationStateAction =
  | { type: 'NAVIGATE'; screen: string; params?: Record<string, string>; replace?: boolean }
  | { type: 'GO_BACK' }
  | { type: 'START_WORKFLOW'; workflowId: string; initialData?: Record<string, unknown> }
  | { type: 'ADVANCE_WORKFLOW'; stepData?: Record<string, unknown> }
  | { type: 'COMPLETE_WORKFLOW' }
  | { type: 'SET_PARAMS'; params: Record<string, string> }
  | { type: 'RESET'; initial?: Partial<NavigationState> };
