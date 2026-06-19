import type { HTMLComponent, FormTemplateProps } from '../types';

export const FormTemplate: HTMLComponent<FormTemplateProps> = ({
  header = '',
  form = '',
  actions = '',
  className = '',
  id,
  style = '',
  dataAttributes,
}) => {
  const baseStyle = 'display: flex; flex-direction: column; gap: var(--pr-spacing-4); font-family: var(--pr-font-sans); max-width: 640px; margin: 0 auto; padding: var(--pr-spacing-4);';
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  return `<div${attrs}${cls} style="${allStyle}"${dataAttrs}>
    ${header ? `<div class="pr-form-header">${header}</div>` : ''}
    <div class="pr-form-body">${form}</div>
    ${actions ? `<div class="pr-form-actions">${actions}</div>` : ''}
  </div>`;
};
