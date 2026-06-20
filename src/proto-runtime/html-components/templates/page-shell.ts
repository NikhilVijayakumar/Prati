import type { HTMLComponent, PageShellProps } from '../types';

export const PageShell: HTMLComponent<PageShellProps> = ({
  header = '',
  sidebar = '',
  main = '',
  className = '',
  id,
  style = '',
  dataA11yRole,
  dataAttributes,
  skipLinkText = '',
  lang = '',
}) => {
  const baseStyle = 'display: flex; flex-direction: column; height: 100vh; font-family: var(--pr-font-sans); background-color: var(--pr-bg-default); color: var(--pr-text-primary);';
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const a11yRole = dataA11yRole ? ` data-a11y-role="${dataA11yRole}"` : '';
  const langAttr = lang ? ` lang="${lang}"` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  const skipText = skipLinkText || 'Skip to content';
  const skipL10n = skipLinkText ? '' : ' data-l10n="skip_to_content"';

  return `<div${attrs}${cls}${langAttr} style="${allStyle}"${a11yRole}${dataAttrs}>
    <a href="#main-content" class="pr-skip-link"${skipL10n} style="position: absolute; left: -9999px; top: 0; z-index: var(--pr-z-tooltip); padding: var(--pr-spacing-1) var(--pr-spacing-2); background-color: var(--pr-primary); color: var(--pr-text-on-primary); text-decoration: none; border-radius: var(--pr-radius-md); font-size: var(--pr-font-size-sm);">${skipText}</a>
    ${header ? `<div class="pr-shell-header" role="banner">${header}</div>` : ''}
    <div class="pr-shell-body" style="display: flex; flex: 1; overflow: hidden;">
      ${sidebar ? `<div class="pr-shell-sidebar" role="complementary">${sidebar}</div>` : ''}
      <main id="main-content" class="pr-shell-main" style="flex: 1; overflow-y: auto; padding: var(--pr-spacing-4);"${dataA11yRole ? ` data-a11y-role="${dataA11yRole}"` : ''}>${main}</main>
    </div>
  </div>`;
};
