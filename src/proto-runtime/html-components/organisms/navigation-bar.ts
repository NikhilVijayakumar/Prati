import type { HTMLComponent, NavigationBarProps } from '../types';

export const NavigationBar: HTMLComponent<NavigationBarProps> = ({
  brand = '',
  items = '',
  className = '',
  id,
  style = '',
  dataA11yRole,
  dataA11yIntent,
  dataAttributes,
}) => {
  const baseStyle = 'display: flex; align-items: center; justify-content: space-between; padding: 0 var(--pr-spacing-3); height: 56px; background-color: var(--pr-bg-paper); border-bottom: 1px solid var(--pr-border-default); font-family: var(--pr-font-sans);';
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const a11yRole = dataA11yRole ? ` data-a11y-role="${dataA11yRole}"` : ' role="navigation"';
  const a11yIntent = dataA11yIntent ? ` data-a11y-intent="${dataA11yIntent}"` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  return `<header${attrs}${cls} style="${allStyle}"${a11yRole}${a11yIntent}${dataAttrs}>
    <div class="pr-nav-brand" style="font-weight: var(--pr-font-weight-semibold); font-size: var(--pr-font-size-base); color: var(--pr-text-primary);">${brand}</div>
    <nav class="pr-nav-items" style="display: flex; align-items: center; gap: var(--pr-spacing-1);">${items}</nav>
  </header>`;
};
