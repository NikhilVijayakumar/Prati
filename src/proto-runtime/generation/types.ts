import type { ProtoRuntimeConfig, ScreenDefinition, WorkflowDefinition } from '../types';

export type GenerationInput = {
  specs: SpecificationInput[];
  boilerplate?: ProtoRuntimeConfig;
};

export type SpecificationInput = {
  id: string;
  title: string;
  description?: string;
  screens?: ScreenDefinition[];
  workflows?: WorkflowDefinition[];
  mockData?: Record<string, unknown[]>;
  localization?: Record<string, Record<string, string>>;
};

export type GenerationOutput = {
  config: ProtoRuntimeConfig;
  files: GeneratedFile[];
  metadata: GenerationMetadata;
};

export type GeneratedFile = {
  path: string;
  content: string;
  type: 'html' | 'css' | 'js' | 'json' | 'config';
};

export type GenerationMetadata = {
  timestamp: number;
  specCount: number;
  screenCount: number;
  workflowCount: number;
  status: 'success' | 'partial' | 'failed';
  warnings: string[];
  errors: string[];
};

export type GenerationState = 'idle' | 'input-received' | 'scaffolding-complete' | 'features-generated' | 'configuration-complete' | 'prototype-ready' | 'generation-failed';
