import type { HTMLComponent, StatusDotProps } from '../types';

const toneColors: Record<string, string> = {
  ok: 'var(--pr-success)',
  warning: 'var(--pr-warning)',
  error: 'var(--pr-error)',
  executing: 'var(--pr-info)',
  waiting: 'var(--pr-warning)',
  default: 'var(--pr-text-secondary)',
};

export const StatusDot: HTMLComponent<StatusDotProps> = ({
  tone = 'default',
  size = 10,
  className = '',
  id,
  style = '',
  ariaLabel,
  dataAttributes,
}) => {
  const color = toneColors[tone] || toneColors.default;
  const baseStyle = `display: inline-block; width: ${size}px; height: ${size}px; border-radius: var(--pr-radius-full); background-color: ${color}; flex-shrink: 0;`;
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const a11y = ariaLabel ? ` role="status" aria-label="${ariaLabel}"` : ' aria-hidden="true"';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  return `<span${attrs}${cls} style="${allStyle}"${a11y}${dataAttrs}></span>`;
};
