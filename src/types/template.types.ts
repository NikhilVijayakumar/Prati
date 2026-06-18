export interface TemplateRendererConfig {
  basePath?: string;
}

export interface RenderTemplateOptions {
  templateName: string;
  data: Record<string, unknown>;
}

export interface RenderResult {
  success: boolean;
  html?: string;
  error?: string;
}

export interface TemplateRendererService {
  configure: (config: TemplateRendererConfig) => void;
  render: (options: RenderTemplateOptions) => Promise<RenderResult>;
}
