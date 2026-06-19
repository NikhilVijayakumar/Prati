import type { ProtoRuntimeConfig, ScreenDefinition, WorkflowDefinition } from '../types';
import type { GenerationInput, GenerationOutput, GeneratedFile, GenerationMetadata } from './types';

export function generatePrototype(input: GenerationInput): GenerationOutput {
  const warnings: string[] = [];
  const errors: string[] = [];
  const files: GeneratedFile[] = [];
  const allScreens: ScreenDefinition[] = [];
  const allWorkflows: WorkflowDefinition[] = [];
  const allMockData: Record<string, unknown[]> = {};
  const allLocalization: Record<string, Record<string, string>> = {};

  for (const spec of input.specs) {
    if (spec.screens) allScreens.push(...spec.screens);
    if (spec.workflows) allWorkflows.push(...spec.workflows);
    if (spec.mockData) {
      for (const [key, value] of Object.entries(spec.mockData)) {
        allMockData[key] = value;
      }
    }
    if (spec.localization) {
      for (const [lang, resources] of Object.entries(spec.localization)) {
        if (!allLocalization[lang]) allLocalization[lang] = {};
        Object.assign(allLocalization[lang], resources);
      }
    }
  }

  const navigationConfig = input.boilerplate?.navigation ?? {
    screens: allScreens,
    workflows: allWorkflows.length > 0 ? allWorkflows : undefined,
    defaultScreen: allScreens[0]?.id,
  };

  const config: ProtoRuntimeConfig = {
    navigation: navigationConfig,
    persistence: input.boilerplate?.persistence ?? { namespace: 'proto-gen', storage: 'localStorage' },
    mockData: {
      datasets: Object.keys(allMockData).length > 0 ? allMockData : input.boilerplate?.mockData?.datasets ?? {},
    },
    localization: {
      defaultLanguage: input.boilerplate?.localization?.defaultLanguage ?? 'en',
      resources: Object.keys(allLocalization).length > 0 ? allLocalization : input.boilerplate?.localization?.resources ?? {},
    },
    theme: input.boilerplate?.theme ?? { mode: 'light' },
  };

  files.push({
    path: 'proto.config.json',
    content: JSON.stringify(config, null, 2),
    type: 'config',
  });

  const html = generateShellHtml(config);
  files.push({
    path: 'index.html',
    content: html,
    type: 'html',
  });

  for (const spec of input.specs) {
    if (spec.screens) {
      for (const screen of spec.screens) {
        files.push({
          path: `screens/${screen.id}.html`,
          content: generateScreenPlaceholder(screen, spec.title),
          type: 'html',
        });
      }
    }
    if (spec.mockData) {
      files.push({
        path: `data/${spec.id}.json`,
        content: JSON.stringify(spec.mockData, null, 2),
        type: 'json',
      });
    }
    if (spec.localization) {
      for (const [lang, resources] of Object.entries(spec.localization)) {
        files.push({
          path: `locals/${lang}.json`,
          content: JSON.stringify(resources, null, 2),
          type: 'json',
        });
      }
    }
  }

  if (input.specs.length === 0) {
    warnings.push('No specifications provided; generated empty prototype shell');
  }

  if (allScreens.length === 0 && (!input.boilerplate?.navigation?.screens || input.boilerplate.navigation.screens.length === 0)) {
    warnings.push('No screens defined; navigation will be empty');
  }

  const status = errors.length > 0 ? 'failed' : warnings.length > 0 ? 'partial' : 'success';

  const metadata: GenerationMetadata = {
    timestamp: Date.now(),
    specCount: input.specs.length,
    screenCount: allScreens.length,
    workflowCount: allWorkflows.length,
    status,
    warnings,
    errors,
  };

  return { config, files, metadata };
}

function generateShellHtml(config: ProtoRuntimeConfig): string {
  const screens = config.navigation?.screens ?? [];
  const hasNav = screens.length > 0;
  const routes = screens.map((s) => `<a href="#${s.id}" data-navigation-intent="${s.id}">${s.label}</a>`).join('\n        ');

  return `<!DOCTYPE html>
<html lang="${config.localization?.defaultLanguage ?? 'en'}" data-theme="${config.theme?.mode ?? 'light'}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${config.localization?.resources?.en?.['shell.title'] ?? 'Prototype'}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Mono&display=swap" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: var(--pr-bg-default); color: var(--pr-text-primary); min-height: 100vh; }
    :focus-visible { outline: 2px solid var(--pr-primary); outline-offset: 2px; border-radius: inherit; }
    @keyframes pr-spin { to { transform: rotate(360deg); } }
    .pr-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
    .pr-skip-link:focus { left: var(--pr-spacing-2) !important; }
  </style>
  <link rel="stylesheet" href="proto-runtime.css" />
</head>
<body>
  <div id="pr-app">
    <a href="#pr-main" class="pr-skip-link pr-sr-only" style="position: absolute;">Skip to content</a>
    ${hasNav ? `
    <nav id="pr-nav" role="navigation" aria-label="Main navigation" style="display: flex; align-items: center; gap: var(--pr-spacing-2); padding: 0 var(--pr-spacing-3); height: 56px; background-color: var(--pr-bg-paper); border-bottom: 1px solid var(--pr-border-default);">
      <span style="font-weight: var(--pr-font-weight-semibold); font-size: var(--pr-font-size-base);">${config.localization?.resources?.en?.['shell.brand'] ?? 'Prototype'}</span>
      <div style="display: flex; gap: var(--pr-spacing-1); margin-left: auto;">
        ${routes}
      </div>
    </nav>
    ` : ''}
    <main id="pr-main" style="padding: var(--pr-spacing-4);">
      <div id="pr-viewport">
        <p style="color: var(--pr-text-secondary); text-align: center; padding: var(--pr-spacing-6);">
          ${config.localization?.resources?.en?.['shell.welcome'] ?? 'Select a screen to begin.'}
        </p>
      </div>
    </main>
  </div>
  <script src="proto-runtime.js"></script>
  <script>
    window.addEventListener('DOMContentLoaded', function() {
      if (window.PratiProto && window.location.hash) {
        var screenId = window.location.hash.slice(1).split('?')[0];
        var viewport = document.getElementById('pr-viewport');
        if (viewport) {
          viewport.innerHTML = '<p style="color: var(--pr-text-secondary); text-align: center; padding: var(--pr-spacing-6);">Screen: ' + screenId + '</p>';
        }
      }
    });
  </script>
</body>
</html>`;
}

function generateScreenPlaceholder(screen: ScreenDefinition, specTitle: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${screen.label} - ${specTitle}</title>
  <link rel="stylesheet" href="../proto-runtime.css" />
</head>
<body>
  <div class="pr-screen" data-screen="${screen.id}" style="padding: var(--pr-spacing-4); font-family: var(--pr-font-sans);">
    <h1 style="font-size: var(--pr-font-size-xl); font-weight: var(--pr-font-weight-semibold); color: var(--pr-text-primary); margin-bottom: var(--pr-spacing-2);">${screen.label}</h1>
    <p style="color: var(--pr-text-secondary); font-size: var(--pr-font-size-sm);">Route: ${screen.route}</p>
    <div id="pr-screen-content" style="margin-top: var(--pr-spacing-4);"></div>
  </div>
</body>
</html>`;
}

export { generateShellHtml, generateScreenPlaceholder };
