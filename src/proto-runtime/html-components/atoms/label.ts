import type { HTMLComponent, LabelProps } from '../types';

export const Label: HTMLComponent<LabelProps> = ({
  text = '',
  htmlFor,
  required = false,
  className = '',
  id,
  style = '',
  dataL10n,
  dataAttributes,
}) => {
  const baseStyle = 'font-size: var(--pr-font-size-sm); font-weight: var(--pr-font-weight-medium); color: var(--pr-text-primary); font-family: var(--pr-font-sans); line-height: var(--pr-line-height-normal); display: block; margin-bottom: var(--pr-spacing-1);';
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const forAttr = htmlFor ? ` for="${htmlFor}"` : '';
  const l10n = dataL10n ? ` data-l10n="${dataL10n}"` : '';
  const requiredMark = required ? `<span class="pr-required" style="color: var(--pr-error); margin-left: 2px;">*</span>` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  return `<label${attrs}${cls} style="${allStyle}"${forAttr}${l10n}${dataAttrs}>${text}${requiredMark}</label>`;
};
