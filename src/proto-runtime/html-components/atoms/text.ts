import type { HTMLComponent, TextProps } from '../types';

const variantStyles: Record<string, string> = {
  h1: 'font-size: var(--pr-font-size-2xl); font-weight: var(--pr-font-weight-semibold); line-height: var(--pr-line-height-tight); color: var(--pr-text-primary);',
  h2: 'font-size: var(--pr-font-size-xl); font-weight: var(--pr-font-weight-semibold); line-height: var(--pr-line-height-tight); color: var(--pr-text-primary);',
  h3: 'font-size: var(--pr-font-size-lg); font-weight: var(--pr-font-weight-medium); line-height: var(--pr-line-height-tight); color: var(--pr-text-primary);',
  body: 'font-size: var(--pr-font-size-base); font-weight: var(--pr-font-weight-normal); line-height: var(--pr-line-height-normal); color: var(--pr-text-primary);',
  caption: 'font-size: var(--pr-font-size-sm); font-weight: var(--pr-font-weight-normal); line-height: var(--pr-line-height-normal); color: var(--pr-text-secondary);',
  label: 'font-size: var(--pr-font-size-sm); font-weight: var(--pr-font-weight-medium); line-height: var(--pr-line-height-normal); color: var(--pr-text-primary);',
};

export const Text: HTMLComponent<TextProps> = ({
  content = '',
  variant = 'body',
  className = '',
  id,
  style = '',
  dataL10n,
  dataAttributes,
}) => {
  const tag = variant === 'h1' || variant === 'h2' || variant === 'h3' ? variant : 'span';
  const baseStyle = variantStyles[variant] || variantStyles.body;
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const l10n = dataL10n ? ` data-l10n="${dataL10n}"` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  return `<${tag}${attrs}${cls} style="${allStyle}"${l10n}${dataAttrs}>${content}</${tag}>`;
};
