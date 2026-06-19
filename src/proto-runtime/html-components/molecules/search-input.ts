import type { HTMLComponent, SearchInputProps } from '../types';

export const SearchInput: HTMLComponent<SearchInputProps> = ({
  placeholder = 'Search...',
  value = '',
  className = '',
  id,
  style = '',
  ariaLabel = 'Search',
  placeholderDataL10n,
  onInput,
  dataAttributes,
}) => {
  const baseStyle = 'width: 100%; padding: var(--pr-spacing-1) var(--pr-spacing-2); padding-left: var(--pr-spacing-4); border: 1px solid var(--pr-border-default); border-radius: var(--pr-radius-md); background-color: var(--pr-bg-paper); color: var(--pr-text-primary); font-family: var(--pr-font-sans); font-size: var(--pr-font-size-sm); outline: none; transition: border-color var(--pr-motion-duration-fast) var(--pr-motion-easing); box-sizing: border-box; min-height: 44px;';
  const allStyle = style ? `${baseStyle} ${style}` : baseStyle;
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const a11y = ` aria-label="${ariaLabel}"`;
  const valAttr = value ? ` value="${value}"` : '';
  const l10n = placeholderDataL10n ? ` data-l10n="${placeholderDataL10n}"` : '';
  const inputHandler = onInput ? ` oninput="${onInput}"` : '';
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';

  const iconStyle = 'position: absolute; left: var(--pr-spacing-1); top: 50%; transform: translateY(-50%); color: var(--pr-text-secondary); pointer-events: none; display: flex; align-items: center; justify-content: center; width: 20px; height: 20px;';
  return `<div style="position: relative; display: flex; align-items: center;">
    <span style="${iconStyle}" aria-hidden="true">&#x1F50D;</span>
    <input type="search"${attrs}${cls} style="${allStyle}" placeholder="${placeholder}"${valAttr}${a11y}${l10n}${inputHandler}${dataAttrs}>
  </div>`;
};
