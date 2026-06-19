import type { HTMLComponent, DashboardTemplateProps } from '../types';

export const DashboardTemplate: HTMLComponent<DashboardTemplateProps> = ({
  header = '',
  sidebar = '',
  summary = '',
  main = '',
  className = '',
  id,
  style = '',
  dataAttributes,
}) => {
  const baseStyle = 'display: flex; flex-direction: column; gap: var(--pr-spacing-3); font-family: var(--pr-font-sans); height: 100%;';
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  return `<div${attrs}${cls} style="${allStyle}"${dataAttrs}>
    ${header ? `<div class="pr-dashboard-header">${header}</div>` : ''}
    <div class="pr-dashboard-body" style="display: flex; flex: 1; gap: var(--pr-spacing-3); overflow: hidden;">
      ${sidebar ? `<div class="pr-dashboard-sidebar" style="width: 240px; flex-shrink: 0;">${sidebar}</div>` : ''}
      <div class="pr-dashboard-main" style="flex: 1; display: flex; flex-direction: column; gap: var(--pr-spacing-3); overflow-y: auto;">
        ${summary ? `<div class="pr-dashboard-summary">${summary}</div>` : ''}
        <div class="pr-dashboard-content" style="flex: 1;">${main}</div>
      </div>
    </div>
  </div>`;
};
