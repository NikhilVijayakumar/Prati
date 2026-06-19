import type { HTMLComponent, ListTemplateProps } from '../types';

export const ListTemplate: HTMLComponent<ListTemplateProps> = ({
  header = '',
  toolbar = '',
  content = '',
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
    ${header ? `<div class="pr-list-header">${header}</div>` : ''}
    ${toolbar ? `<div class="pr-list-toolbar">${toolbar}</div>` : ''}
    <div class="pr-list-content" style="flex: 1; overflow-y: auto;">${content}</div>
  </div>`;
};
