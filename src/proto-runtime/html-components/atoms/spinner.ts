import type { HTMLComponent, SpinnerProps } from '../types';

const sizeMap: Record<string, string> = {
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '40px',
};

export const Spinner: HTMLComponent<SpinnerProps> = ({
  size = 'md',
  label,
  className = '',
  id,
  style = '',
  dataL10n,
  dataAttributes,
}) => {
  const dim = sizeMap[size] || sizeMap.md;
  const baseStyle = `display: inline-block; width: ${dim}; height: ${dim}; border: 2px solid var(--pr-border-default); border-top-color: var(--pr-primary); border-radius: var(--pr-radius-full); animation: pr-spin 0.6s linear infinite;`;
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const l10n = dataL10n ? ` data-l10n="${dataL10n}"` : '';
  const labelAttr = label ? ` role="status" aria-label="${label}"` : ' aria-hidden="true"';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  return `<span${attrs}${cls} style="${allStyle}"${labelAttr}${l10n}${dataAttrs}><span class="pr-sr-only">${label ?? 'Loading'}</span></span>`;
};
