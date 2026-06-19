import type { HTMLComponent, SideDrawerProps } from '../types';

export const SideDrawer: HTMLComponent<SideDrawerProps> = ({
  items = '',
  open = true,
  className = '',
  id,
  style = '',
  dataA11yRole,
  dataA11yIntent,
  dataAttributes,
}) => {
  const baseStyle = 'display: flex; flex-direction: column; gap: var(--pr-spacing-1); padding: var(--pr-spacing-2); background-color: var(--pr-bg-paper); border-right: 1px solid var(--pr-border-default); width: 240px; height: 100%; overflow-y: auto; font-family: var(--pr-font-sans); transition: transform var(--pr-motion-duration-normal) var(--pr-motion-easing);';
  const closedStyle = !open ? 'transform: translateX(-100%); visibility: hidden; position: absolute;' : '';
  const allStyle = `${baseStyle} ${closedStyle} ${style}`.trim();
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const a11yRole = dataA11yRole ? ` data-a11y-role="${dataA11yRole}"` : ' role="navigation" aria-label="Side navigation"';
  const a11yIntent = dataA11yIntent ? ` data-a11y-intent="${dataA11yIntent}"` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  return `<aside${attrs}${cls} style="${allStyle}"${a11yRole}${a11yIntent}${dataAttrs}>
    ${items}
  </aside>`;
};
