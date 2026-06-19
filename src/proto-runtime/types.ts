export type ProtoRuntimeConfig = {
  navigation?: NavigationConfig;
  persistence?: PersistenceConfig;
  mockData?: MockDataConfig;
  localization?: LocalizationConfig;
  theme?: ThemeConfig;
};

export type NavigationConfig = {
  screens: ScreenDefinition[];
  workflows?: WorkflowDefinition[];
  defaultScreen?: string;
  deepLinks?: Record<string, string>;
};

export type ScreenDefinition = {
  id: string;
  label: string;
  route: string;
  component?: string;
  template?: string;
  params?: string[];
};

export type WorkflowDefinition = {
  id: string;
  label: string;
  steps: WorkflowStep[];
  onComplete?: string;
};

export type WorkflowStep = {
  id: string;
  screen: string;
  label: string;
  required?: boolean;
};

export type PersistenceConfig = {
  namespace: string;
  storage?: 'localStorage' | 'sessionStorage' | 'memory';
};

export type MockDataConfig = {
  datasets: Record<string, unknown[]>;
};

export type LocalizationConfig = {
  defaultLanguage: string;
  resources: Record<string, Record<string, string>>;
};

export type ThemeConfig = {
  mode: 'light' | 'dark';
  tokens?: Record<string, string>;
};

export type NavigationState = {
  currentScreen: string | null;
  currentWorkflow: string | null;
  currentStep: number;
  history: string[];
  params: Record<string, string>;
  workflowData: Record<string, unknown>;
};

export type PersistenceKey = string;

export type RouterEventType = 'navigation' | 'workflow-start' | 'workflow-step' | 'workflow-complete' | 'error';

export type RouterEvent = {
  type: RouterEventType;
  target?: string;
  state?: Partial<NavigationState>;
  error?: string;
  timestamp: number;
};

export type RouteResolver = (route: string) => ScreenDefinition | undefined;

export type NavigationListener = (event: RouterEvent) => void;
