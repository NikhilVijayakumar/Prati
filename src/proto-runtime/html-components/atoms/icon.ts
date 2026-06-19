import type { HTMLComponent, IconProps } from '../types';

export const Icon: HTMLComponent<IconProps> = ({
  name,
  size = 20,
  className = '',
  id,
  style = '',
  ariaLabel,
  dataAttributes,
}) => {
  const baseStyle = `display: inline-flex; align-items: center; justify-content: center; width: ${size}px; height: ${size}px; flex-shrink: 0; color: var(--pr-text-secondary);`;
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const a11y = ariaLabel ? ` aria-label="${ariaLabel}"` : ' aria-hidden="true"';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  return `<span${attrs}${cls} style="${allStyle}"${a11y}${dataAttrs}>${name}</span>`;
};
