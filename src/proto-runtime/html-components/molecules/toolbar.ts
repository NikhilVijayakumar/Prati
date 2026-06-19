import type { HTMLComponent, ToolbarProps } from '../types';

export const Toolbar: HTMLComponent<ToolbarProps> = ({
  items = '',
  className = '',
  id,
  style = '',
  dataA11yRole,
  dataA11yIntent,
  dataAttributes,
}) => {
  const baseStyle = 'display: flex; align-items: center; gap: var(--pr-spacing-1); padding: var(--pr-spacing-1) var(--pr-spacing-2); background-color: var(--pr-bg-paper); border-bottom: 1px solid var(--pr-border-default); flex-wrap: wrap; min-height: 48px;';
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const a11yRole = dataA11yRole ? ` data-a11y-role="${dataA11yRole}"` : ' role="toolbar"';
  const a11yIntent = dataA11yIntent ? ` data-a11y-intent="${dataA11yIntent}"` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  return `<div${attrs}${cls} style="${allStyle}"${a11yRole}${a11yIntent}${dataAttrs}>${items}</div>`;
};
