import type { HTMLComponent, NotificationProps } from '../types';

const toneStyles: Record<string, string> = {
  neutral: 'background-color: var(--pr-bg-elevated); border-left: 3px solid var(--pr-border-strong);',
  primary: 'background-color: var(--pr-primary-soft); border-left: 3px solid var(--pr-primary);',
  success: 'background-color: color-mix(in srgb, var(--pr-success) 10%, var(--pr-bg-paper)); border-left: 3px solid var(--pr-success);',
  warning: 'background-color: color-mix(in srgb, var(--pr-warning) 10%, var(--pr-bg-paper)); border-left: 3px solid var(--pr-warning);',
  error: 'background-color: color-mix(in srgb, var(--pr-error) 10%, var(--pr-bg-paper)); border-left: 3px solid var(--pr-error);',
  info: 'background-color: var(--pr-primary-soft); border-left: 3px solid var(--pr-info);',
};

export const Notification: HTMLComponent<NotificationProps> = ({
  message = '',
  tone = 'neutral',
  dismissible = false,
  role = 'alert',
  className = '',
  id,
  style = '',
  dataL10n,
  dataAttributes,
}) => {
  const baseStyle = 'padding: var(--pr-spacing-2) var(--pr-spacing-3); border-radius: var(--pr-radius-md); font-family: var(--pr-font-sans); font-size: var(--pr-font-size-sm); color: var(--pr-text-primary); display: flex; align-items: center; gap: var(--pr-spacing-2);';
  const toneStyle = toneStyles[tone] || toneStyles.neutral;
  const allStyle = `${baseStyle} ${toneStyle} ${style}`.trim();
  const attrs = id ? ` id="${id}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const l10n = dataL10n ? ` data-l10n="${dataL10n}"` : '';
  const roleAttr = ` role="${role}"`;
  const dataAttrs = dataAttributes
    ? Object.entries(dataAttributes).map(([k, v]) => ` data-${k}="${v}"`).join('')
    : '';
  let html = `<div${attrs}${cls} style="${allStyle}"${roleAttr}${l10n}${dataAttrs}>`;
  if (message) {
    html += `<span style="flex: 1;">${message}</span>`;
  }
  if (dismissible) {
    html += `<button type="button" class="pr-notification-dismiss" style="background: none; border: none; cursor: pointer; color: var(--pr-text-secondary); padding: 4px; font-size: 16px; line-height: 1; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;" onclick="this.parentElement.remove()" aria-label="Dismiss">&times;</button>`;
  }
  html += `</div>`;
  return html;
};
