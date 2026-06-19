import type { HTMLComponent, DataTableProps } from '../types';

export const DataTable: HTMLComponent<DataTableProps> = ({
  headers = '',
  rows = '',
  emptyMessage = 'No data available',
  className = '',
  id,
  style = '',
  emptyDataL10n,
  dataA11yRole,
  dataA11yIntent,
  dataAttributes,
}) => {
  const baseStyle = 'width: 100%; border-collapse: collapse; font-family: var(--pr-font-sans); font-size: var(--pr-font-size-sm);';
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const a11yRole = dataA11yRole ? ` data-a11y-role="${dataA11yRole}"` : '';
  const a11yIntent = dataA11yIntent ? ` data-a11y-intent="${dataA11yIntent}"` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';

  const hasContent = headers || rows;
  const emptyL10n = emptyDataL10n ? ` data-l10n="${emptyDataL10n}"` : '';

  if (!hasContent) {
    return `<div${attrs}${cls} style="padding: var(--pr-spacing-4); text-align: center; color: var(--pr-text-secondary); font-family: var(--pr-font-sans); font-size: var(--pr-font-size-sm);"${emptyL10n}${dataAttrs}>${emptyMessage}</div>`;
  }

  let html = `<div style="overflow-x: auto;"${a11yRole}${a11yIntent}><table${attrs}${cls} style="${allStyle}"${dataAttrs}>`;
  if (headers) {
    html += `<thead style="border-bottom: 2px solid var(--pr-border-default);">${headers}</thead>`;
  }
  if (rows) {
    html += `<tbody>${rows}</tbody>`;
  }
  html += `</table></div>`;
  return html;
};

export const th = (content: string, align: 'left' | 'center' | 'right' = 'left'): string =>
  `<th style="padding: var(--pr-spacing-1) var(--pr-spacing-2); text-align: ${align}; font-weight: var(--pr-font-weight-semibold); color: var(--pr-text-secondary); font-size: var(--pr-font-size-xs); text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">${content}</th>`;

export const td = (content: string, align: 'left' | 'center' | 'right' = 'left'): string =>
  `<td style="padding: var(--pr-spacing-2) var(--pr-spacing-2); text-align: ${align}; color: var(--pr-text-primary); border-bottom: 1px solid var(--pr-border-default); vertical-align: middle;">${content}</td>`;

export const tr = (cells: string, active = false): string => {
  const style = active
    ? 'background-color: var(--pr-primary-soft);'
    : 'transition: background-color var(--pr-motion-duration-fast) var(--pr-motion-easing);';
  return `<tr style="${style}">${cells}</tr>`;
};
