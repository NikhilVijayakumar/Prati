import type { HTMLComponent, MenuItemProps } from '../types';

export const MenuItem: HTMLComponent<MenuItemProps> = ({
  label = '',
  icon,
  active = false,
  className = '',
  id,
  style = '',
  dataNavigation,
  dataL10n,
  dataAttributes,
}) => {
  const activeStyle = active
    ? 'background-color: var(--pr-primary-soft); color: var(--pr-primary); font-weight: var(--pr-font-weight-medium);'
    : 'color: var(--pr-text-primary);';
  const baseStyle = 'display: flex; align-items: center; gap: var(--pr-spacing-2); padding: var(--pr-spacing-1) var(--pr-spacing-2); border-radius: var(--pr-radius-md); cursor: pointer; font-family: var(--pr-font-sans); font-size: var(--pr-font-size-sm); transition: background-color var(--pr-motion-duration-fast) var(--pr-motion-easing); border: none; background: none; width: 100%; text-align: left; min-height: 44px; outline: none;';
  const allStyle = `${baseStyle} ${activeStyle} ${style}`.trim();
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const navAttr = dataNavigation ? ` data-navigation-intent="${dataNavigation}"` : '';
  const l10n = dataL10n ? ` data-l10n="${dataL10n}"` : '';
  const a11yAttrs = active ? ' aria-current="page"' : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  const iconHtml = icon ? `<span class="pr-menu-icon" aria-hidden="true" style="width: 20px; display: inline-flex; align-items: center; justify-content: center;">${icon}</span>` : '';
  return `<button type="button"${attrs}${cls} style="${allStyle}"${navAttr}${l10n}${a11yAttrs}${dataAttrs}>${iconHtml}<span>${label}</span></button>`;
};
