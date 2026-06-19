import type { HTMLComponent, FormFieldProps } from '../types';

export const FormField: HTMLComponent<FormFieldProps> = ({
  label,
  input = '',
  helpText,
  error,
  required = false,
  className = '',
  id,
  style = '',
  labelDataL10n,
  helpDataL10n,
  errorDataL10n,
  dataAttributes,
}) => {
  const baseStyle = 'display: flex; flex-direction: column; gap: var(--pr-spacing-1); font-family: var(--pr-font-sans);';
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';

  let html = `<div${attrs}${cls} style="${allStyle}"${dataAttrs}>`;
  if (label) {
    const l10nAttr = labelDataL10n ? ` data-l10n="${labelDataL10n}"` : '';
    const reqMark = required ? `<span style="color: var(--pr-error); margin-left: 2px;">*</span>` : '';
    html += `<label style="font-size: var(--pr-font-size-sm); font-weight: var(--pr-font-weight-medium); color: var(--pr-text-primary);"${l10nAttr}>${label}${reqMark}</label>`;
  }
  if (input) {
    html += `<div class="pr-field-input">${input}</div>`;
  }
  if (helpText && !error) {
    const l10nAttr = helpDataL10n ? ` data-l10n="${helpDataL10n}"` : '';
    html += `<span style="font-size: var(--pr-font-size-xs); color: var(--pr-text-secondary);"${l10nAttr}>${helpText}</span>`;
  }
  if (error) {
    const l10nAttr = errorDataL10n ? ` data-l10n="${errorDataL10n}"` : '';
    html += `<span style="font-size: var(--pr-font-size-xs); color: var(--pr-error);" role="alert"${l10nAttr}>${error}</span>`;
  }
  html += `</div>`;
  return html;
};
