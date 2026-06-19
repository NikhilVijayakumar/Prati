import type {
  NavigationState,
  NavigationListener,
} from '../types';

export type {
  NavigationState,
  NavigationListener,
  RouterEvent,
  RouterEventType,
  RouteResolver,
  NavigationConfig,
  ScreenDefinition,
  WorkflowDefinition,
  WorkflowStep,
} from '../types';

export type NavigateOptions = {
  params?: Record<string, string>;
  replace?: boolean;
  preserveWorkflow?: boolean;
};

export type WorkflowTransition = {
  workflowId: string;
  fromStep: string;
  toStep: string;
  data?: Record<string, unknown>;
};

export type RouterState = {
  screens: Map<string, ScreenDefinition>;
  workflows: Map<string, WorkflowDefinition>;
  defaultScreen: string;
  navigationState: NavigationState;
  listeners: Set<NavigationListener>;
  deepLinks: Map<string, string>;
};
