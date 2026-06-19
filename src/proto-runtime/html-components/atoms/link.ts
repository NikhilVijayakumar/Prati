import type { HTMLComponent, LinkProps } from '../types';

export const Link: HTMLComponent<LinkProps> = ({
  label = '',
  href,
  className = '',
  id,
  style = '',
  dataNavigation,
  ariaLabel,
  dataL10n,
  dataAttributes,
}) => {
  const baseStyle = 'color: var(--pr-primary); text-decoration: none; font-family: var(--pr-font-sans); font-size: var(--pr-font-size-sm); font-weight: var(--pr-font-weight-medium); cursor: pointer; transition: opacity var(--pr-motion-duration-fast) var(--pr-motion-easing); min-height: 44px; display: inline-flex; align-items: center; outline: none;';
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const navAttr = dataNavigation ? ` data-navigation-intent="${dataNavigation}"` : '';
  const a11yLabel = ariaLabel ? ` aria-label="${ariaLabel}"` : '';
  const l10n = dataL10n ? ` data-l10n="${dataL10n}"` : '';
  const hrefAttr = href ? ` href="${href}"` : ' href="#"';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  return `<a${attrs}${cls} style="${allStyle}"${hrefAttr}${navAttr}${a11yLabel}${l10n}${dataAttrs}>${label}</a>`;
};
