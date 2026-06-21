import handlebars from "handlebars";

import type {
  TemplateRendererConfig,
  RenderTemplateOptions,
  RenderResult,
  TemplateRendererService,
} from "../types/template.types";
import { bundledTemplates } from "../templates";

function isNode(): boolean {
  return typeof process !== "undefined" && !!(process.versions && process.versions.node);
}

export function createTemplateRenderer(cfg?: TemplateRendererConfig & { templates?: Record<string, string> }): TemplateRendererService {
  const templates = cfg?.templates ?? bundledTemplates ?? null;
  const basePath = cfg?.basePath;

  handlebars.registerHelper("ifEquals", function (this: unknown, a: unknown, b: unknown, options: Handlebars.HelperOptions) {
    return a === b ? options.fn(this) : options.inverse(this);
  });

  async function render(options: RenderTemplateOptions): Promise<RenderResult> {
    const { templateName, data } = options;

    if (templates && templates[templateName]) {
      try {
        const compiled = handlebars.compile(templates[templateName]);
        return { success: true, html: compiled(data) };
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) };
      }
    }

    if (isNode() && basePath) {
      if (!/^[a-zA-Z0-9_-]+$/.test(templateName)) {
        return { success: false, error: `Invalid template name: ${templateName}` };
      }
      try {
        const [{ default: fs }, { default: path }] = await Promise.all([
          import('fs/promises'),
          import('path'),
        ]);
        const resolvedBase = path.resolve(basePath);
        const filePath = path.resolve(basePath, `${templateName}.hbs`);
        if (!filePath.startsWith(resolvedBase + path.sep)) {
          return { success: false, error: 'Template path traversal detected' };
        }
        const source = await fs.readFile(filePath, "utf-8");
        const compiled = handlebars.compile(source);
        return { success: true, html: compiled(data) };
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) };
      }
    }

    return { success: false, error: "Template not found: provide a templates map or a basePath (Node)." };
  }

  return { configure: () => {}, render };
}

export const templateRenderer = createTemplateRenderer({ templates: bundledTemplates });
