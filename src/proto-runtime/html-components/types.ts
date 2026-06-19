export type HTMLComponent<T = Record<string, unknown>> = (props: T) => string;

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'error' | 'info';

export type BaseProps = {
  className?: string;
  id?: string;
  style?: string;
  dataAttributes?: Record<string, string>;
};

export type ButtonProps = BaseProps & {
  label?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: Size;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: string;
  ariaLabel?: string;
  onClick?: string;
  dataNavigation?: string;
};

export type BadgeProps = BaseProps & {
  label?: string;
  tone?: Tone;
  size?: Size;
  dataL10n?: string;
};

export type StatusDotProps = BaseProps & {
  tone?: 'ok' | 'warning' | 'error' | 'executing' | 'waiting' | 'default';
  size?: number;
  ariaLabel?: string;
};

export type TextProps = BaseProps & {
  content?: string;
  variant?: 'body' | 'caption' | 'label' | 'h1' | 'h2' | 'h3';
  dataL10n?: string;
};

export type LinkProps = BaseProps & {
  label?: string;
  href?: string;
  dataNavigation?: string;
  ariaLabel?: string;
  dataL10n?: string;
};

export type IconProps = BaseProps & {
  name: string;
  size?: number;
  ariaLabel?: string;
};

export type SeparatorProps = BaseProps & {
  orientation?: 'horizontal' | 'vertical';
  spacing?: Size;
};

export type SpinnerProps = BaseProps & {
  size?: Size;
  label?: string;
  dataL10n?: string;
};

export type LabelProps = BaseProps & {
  text?: string;
  htmlFor?: string;
  required?: boolean;
  dataL10n?: string;
};

export type CardProps = BaseProps & {
  header?: string;
  content?: string;
  footer?: string;
  elevation?: 0 | 1 | 2 | 3;
  padding?: Size;
  dataA11yRole?: string;
  dataA11yIntent?: string;
};

export type NotificationProps = BaseProps & {
  message?: string;
  tone?: Tone;
  dismissible?: boolean;
  role?: 'alert' | 'status';
  dataL10n?: string;
};

export type FormFieldProps = BaseProps & {
  label?: string;
  input?: string;
  helpText?: string;
  error?: string;
  required?: boolean;
  labelDataL10n?: string;
  helpDataL10n?: string;
  errorDataL10n?: string;
};

export type MenuItemProps = BaseProps & {
  label?: string;
  icon?: string;
  active?: boolean;
  dataNavigation?: string;
  dataL10n?: string;
};

export type SearchInputProps = BaseProps & {
  placeholder?: string;
  value?: string;
  ariaLabel?: string;
  placeholderDataL10n?: string;
  onInput?: string;
};

export type ToolbarProps = BaseProps & {
  items?: string;
  dataA11yRole?: string;
  dataA11yIntent?: string;
};

export type DataTableProps = BaseProps & {
  headers?: string;
  rows?: string;
  emptyMessage?: string;
  emptyDataL10n?: string;
  dataA11yRole?: string;
  dataA11yIntent?: string;
};

export type FormLayoutProps = BaseProps & {
  fields?: string;
  actions?: string;
  dataA11yRole?: string;
  dataA11yIntent?: string;
};

export type NavigationBarProps = BaseProps & {
  brand?: string;
  items?: string;
  dataA11yRole?: string;
  dataA11yIntent?: string;
};

export type SideDrawerProps = BaseProps & {
  items?: string;
  open?: boolean;
  dataA11yRole?: string;
  dataA11yIntent?: string;
};

export type SummaryPanelProps = BaseProps & {
  stats?: string;
  dataA11yRole?: string;
  dataA11yIntent?: string;
};

export type PageShellProps = BaseProps & {
  header?: string;
  sidebar?: string;
  main?: string;
  dataA11yRole?: string;
};

export type ListTemplateProps = BaseProps & {
  header?: string;
  toolbar?: string;
  content?: string;
};

export type DetailTemplateProps = BaseProps & {
  header?: string;
  content?: string;
  footer?: string;
};

export type FormTemplateProps = BaseProps & {
  header?: string;
  form?: string;
  actions?: string;
};

export type DashboardTemplateProps = BaseProps & {
  header?: string;
  sidebar?: string;
  summary?: string;
  main?: string;
};

export type ThemeTokens = {
  bgDefault: string;
  bgPaper: string;
  bgElevated: string;
  textPrimary: string;
  textSecondary: string;
  primary: string;
  spacing: (n: number) => string;
};
