import type { HTMLComponent, SeparatorProps } from '../types';

const spacingMap: Record<string, string> = {
  xs: 'var(--pr-spacing-1)',
  sm: 'var(--pr-spacing-2)',
  md: 'var(--pr-spacing-3)',
  lg: 'var(--pr-spacing-4)',
  xl: 'var(--pr-spacing-5)',
};

export const Separator: HTMLComponent<SeparatorProps> = ({
  orientation = 'horizontal',
  spacing = 'md',
  className = '',
  id,
  style = '',
  dataAttributes,
}) => {
  const spacingVal = spacingMap[spacing] || spacingMap.md;
  const isHorizontal = orientation === 'horizontal';
  const baseStyle = isHorizontal
    ? `display: block; height: 1px; background-color: var(--pr-border-default); margin: ${spacingVal} 0; border: none;`
    : `display: inline-block; width: 1px; height: 100%; background-color: var(--pr-border-default); margin: 0 ${spacingVal}; border: none; vertical-align: middle;`;
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  const tag = isHorizontal ? 'hr' : 'span';
  return `<${tag}${attrs}${cls} style="${allStyle}"${dataAttrs} role="separator"></${tag}>`;
};
