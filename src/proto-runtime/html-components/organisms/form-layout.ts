import type { HTMLComponent, FormLayoutProps } from '../types';

export const FormLayout: HTMLComponent<FormLayoutProps> = ({
  fields = '',
  actions = '',
  className = '',
  id,
  style = '',
  dataA11yRole,
  dataA11yIntent,
  dataAttributes,
}) => {
  const baseStyle = 'display: flex; flex-direction: column; gap: var(--pr-spacing-3); font-family: var(--pr-font-sans);';
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const a11yRole = dataA11yRole ? ` data-a11y-role="${dataA11yRole}"` : '';
  const a11yIntent = dataA11yIntent ? ` data-a11y-intent="${dataA11yIntent}"` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  let html = `<form${attrs}${cls} style="${allStyle}"${a11yRole}${a11yIntent}${dataAttrs} novalidate>`;
  if (fields) {
    html += `<div class="pr-form-fields" style="display: flex; flex-direction: column; gap: var(--pr-spacing-3);">${fields}</div>`;
  }
  if (actions) {
    html += `<div class="pr-form-actions" style="display: flex; align-items: center; gap: var(--pr-spacing-2); padding-top: var(--pr-spacing-2); border-top: 1px solid var(--pr-border-default);">${actions}</div>`;
  }
  html += `</form>`;
  return html;
};
