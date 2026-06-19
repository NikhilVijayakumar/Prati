import type { HTMLComponent, DetailTemplateProps } from '../types';

export const DetailTemplate: HTMLComponent<DetailTemplateProps> = ({
  header = '',
  content = '',
  footer = '',
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
    ${header ? `<div class="pr-detail-header">${header}</div>` : ''}
    <div class="pr-detail-content" style="flex: 1; overflow-y: auto;">${content}</div>
    ${footer ? `<div class="pr-detail-footer" style="padding-top: var(--pr-spacing-2); border-top: 1px solid var(--pr-border-default);">${footer}</div>` : ''}
  </div>`;
};
