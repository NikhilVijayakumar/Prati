import type { HTMLComponent, SummaryPanelProps } from '../types';

export const SummaryPanel: HTMLComponent<SummaryPanelProps> = ({
  stats = '',
  className = '',
  id,
  style = '',
  dataA11yRole,
  dataA11yIntent,
  dataAttributes,
}) => {
  const baseStyle = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--pr-spacing-3); font-family: var(--pr-font-sans);';
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const a11yRole = dataA11yRole ? ` data-a11y-role="${dataA11yRole}"` : '';
  const a11yIntent = dataA11yIntent ? ` data-a11y-intent="${dataA11yIntent}"` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  return `<div${attrs}${cls} style="${allStyle}"${a11yRole}${a11yIntent}${dataAttrs}>${stats}</div>`;
};

export const StatCard = (label: string, value: string, tone?: string): string => {
  const colorStyle = tone
    ? `color: var(--pr-${tone});`
    : 'color: var(--pr-text-primary);';
  return `<div class="pr-stat-card" style="background-color: var(--pr-bg-paper); border: 1px solid var(--pr-border-default); border-radius: var(--pr-radius-lg); padding: var(--pr-spacing-3); display: flex; flex-direction: column; gap: var(--pr-spacing-1);">
    <span style="font-size: var(--pr-font-size-xs); color: var(--pr-text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">${label}</span>
    <span style="font-size: var(--pr-font-size-2xl); font-weight: var(--pr-font-weight-semibold); ${colorStyle}">${value}</span>
  </div>`;
};
