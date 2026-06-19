import type { HTMLComponent, BadgeProps } from '../types';

const toneStyles: Record<string, string> = {
  neutral: 'background-color: var(--pr-bg-hover); color: var(--pr-text-secondary);',
  primary: 'background-color: var(--pr-primary-soft); color: var(--pr-primary);',
  success: 'background-color: color-mix(in srgb, var(--pr-success) 15%, transparent); color: var(--pr-success);',
  warning: 'background-color: color-mix(in srgb, var(--pr-warning) 15%, transparent); color: var(--pr-warning);',
  error: 'background-color: color-mix(in srgb, var(--pr-error) 15%, transparent); color: var(--pr-error);',
  info: 'background-color: var(--pr-primary-soft); color: var(--pr-info);',
};

const sizeStyles: Record<string, string> = {
  xs: 'padding: 1px 6px; font-size: var(--pr-font-size-xs);',
  sm: 'padding: 2px 8px; font-size: var(--pr-font-size-xs);',
  md: 'padding: 2px 10px; font-size: var(--pr-font-size-sm);',
  lg: 'padding: 4px 12px; font-size: var(--pr-font-size-sm);',
  xl: 'padding: 4px 14px; font-size: var(--pr-font-size-base);',
};

export const Badge: HTMLComponent<BadgeProps> = ({
  label = '',
  tone = 'neutral',
  size = 'md',
  className = '',
  id,
  style = '',
  dataL10n,
  dataAttributes,
}) => {
  const baseStyle = 'display: inline-flex; align-items: center; border-radius: var(--pr-radius-full); font-family: var(--pr-font-sans); font-weight: var(--pr-font-weight-medium); white-space: nowrap; line-height: var(--pr-line-height-tight);';
  const toneStyle = toneStyles[tone] || toneStyles.neutral;
  const sizeStyle = sizeStyles[size] || sizeStyles.md;
  const allStyle = `${baseStyle} ${toneStyle} ${sizeStyle} ${style}`.trim();
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const l10n = dataL10n ? ` data-l10n="${dataL10n}"` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  return `<span${attrs}${cls} style="${allStyle}"${l10n}${dataAttrs}>${label}</span>`;
};
