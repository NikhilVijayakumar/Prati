import type { HTMLComponent, ButtonProps } from '../types';

const variantStyles: Record<string, string> = {
  primary: 'background-color: var(--pr-primary); color: #FFFFFF; border: none;',
  secondary: 'background-color: transparent; color: var(--pr-text-primary); border: 1px solid var(--pr-border-strong);',
  ghost: 'background-color: transparent; color: var(--pr-text-primary); border: none;',
  danger: 'background-color: var(--pr-error); color: #FFFFFF; border: none;',
};

const sizeStyles: Record<string, string> = {
  xs: 'padding: 4px 8px; font-size: var(--pr-font-size-xs);',
  sm: 'padding: 6px 12px; font-size: var(--pr-font-size-sm);',
  md: 'padding: 8px 16px; font-size: var(--pr-font-size-sm);',
  lg: 'padding: 10px 20px; font-size: var(--pr-font-size-base);',
  xl: 'padding: 12px 24px; font-size: var(--pr-font-size-base);',
};

export const Button: HTMLComponent<ButtonProps> = ({
  label = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  icon,
  className = '',
  id,
  style = '',
  ariaLabel,
  onClick,
  dataNavigation,
  dataAttributes,
}) => {
  const variantStyle = variantStyles[variant] || variantStyles.primary;
  const sizeStyle = sizeStyles[size] || sizeStyles.md;
  const disabledStyle = disabled ? 'opacity: 0.5; cursor: not-allowed;' : 'cursor: pointer;';
  const widthStyle = fullWidth ? 'width: 100%;' : '';
  const baseStyle = 'display: inline-flex; align-items: center; justify-content: center; gap: var(--pr-spacing-1); border-radius: var(--pr-radius-md); font-family: var(--pr-font-sans); font-weight: var(--pr-font-weight-medium); transition: all var(--pr-motion-duration-fast) var(--pr-motion-easing); outline: none; min-height: 44px; min-width: 44px;';
  const allStyle = `${baseStyle} ${variantStyle} ${sizeStyle} ${disabledStyle} ${widthStyle} ${style}`.trim();
  const disabledAttr = disabled ? ' disabled' : '';
  const a11yLabel = ariaLabel ? ` aria-label="${ariaLabel}"` : '';
  const navAttr = dataNavigation ? ` data-navigation-intent="${dataNavigation}"` : '';
  const clickAttr = onClick ? ` onclick="${onClick}"` : '';
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const iconHtml = icon ? `<span class="pr-icon" aria-hidden="true">${icon}</span>` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  return `<button type="button"${attrs}${cls} style="${allStyle}"${disabledAttr}${a11yLabel}${navAttr}${clickAttr}${dataAttrs}>${iconHtml}${label ? `<span>${label}</span>` : ''}</button>`;
};
