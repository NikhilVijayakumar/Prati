import type { HTMLComponent, CardProps } from '../types';

const elevationStyles: Record<number, string> = {
  0: 'box-shadow: none; border: 1px solid var(--pr-border-default);',
  1: 'box-shadow: var(--pr-elevation-1); border: 1px solid var(--pr-border-default);',
  2: 'box-shadow: var(--pr-elevation-2); border: 1px solid var(--pr-border-default);',
  3: 'box-shadow: var(--pr-elevation-3); border: none;',
};

const paddingStyles: Record<string, string> = {
  xs: 'padding: var(--pr-spacing-1);',
  sm: 'padding: var(--pr-spacing-2);',
  md: 'padding: var(--pr-spacing-3);',
  lg: 'padding: var(--pr-spacing-4);',
  xl: 'padding: var(--pr-spacing-5);',
};

export const Card: HTMLComponent<CardProps> = ({
  header,
  content = '',
  footer,
  elevation = 1,
  padding = 'md',
  className = '',
  id,
  style = '',
  dataA11yRole,
  dataA11yIntent,
  dataAttributes,
}) => {
  const baseStyle = 'background-color: var(--pr-bg-paper); border-radius: var(--pr-radius-lg); font-family: var(--pr-font-sans); display: flex; flex-direction: column;';
  const elevStyle = elevationStyles[elevation] || elevationStyles[1];
  const padStyle = paddingStyles[padding] || paddingStyles.md;
  const allStyle = `${baseStyle} ${elevStyle} ${padStyle} ${style}`.trim();
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const a11yRole = dataA11yRole ? ` data-a11y-role="${dataA11yRole}"` : '';
  const a11yIntent = dataA11yIntent ? ` data-a11y-intent="${dataA11yIntent}"` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  let html = `<div${attrs}${cls} style="${allStyle}"${a11yRole}${a11yIntent}${dataAttrs}>`;
  if (header) {
    html += `<div class="pr-card-header" style="font-size: var(--pr-font-size-base); font-weight: var(--pr-font-weight-semibold); color: var(--pr-text-primary); margin-bottom: var(--pr-spacing-2);">${header}</div>`;
  }
  html += `<div class="pr-card-content">${content}</div>`;
  if (footer) {
    html += `<div class="pr-card-footer" style="margin-top: var(--pr-spacing-2); padding-top: var(--pr-spacing-2); border-top: 1px solid var(--pr-border-default);">${footer}</div>`;
  }
  html += `</div>`;
  return html;
};
