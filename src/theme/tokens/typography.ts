// Rule 3: Typography Leads the Interface
export const fonts = {
  sans: '"Inter", "Segoe UI", "Helvetica Neue", sans-serif',
  mono: '"IBM Plex Mono", "Menlo", "Courier New", monospace',
};

declare module '@mui/material/styles' {
  interface TypographyVariants {
    monoBody: React.CSSProperties;
    monoCaption: React.CSSProperties;
    body2Medium: React.CSSProperties;
    body2Bold: React.CSSProperties;
    captionBold: React.CSSProperties;
    micro: React.CSSProperties;
    splashTitle: React.CSSProperties;
    splashSubtitle: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    monoBody?: React.CSSProperties;
    monoCaption?: React.CSSProperties;
    body2Medium?: React.CSSProperties;
    body2Bold?: React.CSSProperties;
    captionBold?: React.CSSProperties;
    micro?: React.CSSProperties;
    splashTitle?: React.CSSProperties;
    splashSubtitle?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    monoBody: true;
    monoCaption: true;
    body2Medium: true;
    body2Bold: true;
    captionBold: true;
    micro: true;
    splashTitle: true;
    splashSubtitle: true;
  }
}

export const typography = {
  fontFamily: fonts.sans,
  // Headings: Confident and readable (Rule 3)
  h1: { fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2 },
  h2: { fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3 },
  h3: { fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.4 },
  h4: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
  h5: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 },
  h6: { fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const, lineHeight: 1.5 },
  
  // Body: Effortless to scan
  body1: { fontSize: '0.9375rem', fontWeight: 400, lineHeight: 1.5 }, // 15px is extremely common in premium Electron apps (Linear, Slack)
  body2: { fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.5 }, // 13px standard
  body2Medium: { fontSize: '0.8125rem', fontWeight: 500, lineHeight: 1.5 }, // 13px medium weight
  body2Bold: { fontSize: '0.8125rem', fontWeight: 600, lineHeight: 1.5 }, // 13px bold weight
  
  // UI Elements
  button: { fontSize: '0.875rem', fontWeight: 500, textTransform: 'none' as const, letterSpacing: '0' },
  caption: { fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.4 }, // 12px standard
  captionBold: { fontSize: '0.75rem', fontWeight: 600, lineHeight: 1.4 }, // 12px bold
  micro: { fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const, lineHeight: 1.2 }, // 10px uppercase badging

  // Custom Data Typography
  monoBody: { fontFamily: fonts.mono, fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.5 },
  monoCaption: { fontFamily: fonts.mono, fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.4 },

  // Specialized Display
  splashTitle: { fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, lineHeight: 1.5 }, // h6 with wider tracking
  splashSubtitle: { fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.05em', lineHeight: 1.4 }, // caption with wider tracking
};
