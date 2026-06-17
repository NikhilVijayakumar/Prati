// Rule 4: Color is a Guidance Tool / theme.md References
export const colors = {
  // Brand Accent (Subtle, rarely used largely)
  primary: '#5A60F5', // Soft indigo
  primaryHover: '#5255DF',
  
  secondary: '#8a8f98', // Neutral secondary
  
  // App Backgrounds (Linear / GitHub styling)
  background: {
    // Light Mode (Soft neutral, 3-4 tones)
    light: '#F5F5F7',      // Barely gray
    paperLight: '#FFFFFF', // Elevated surface

    // Dark Mode (Deep gray, not #000)
    dark: '#0e1015',       // Linear-style deep background
    paperDark: '#16181D',  // Slightly lighter elevated surface
    panelDark: '#1E2028',  // Highest elevation
  },

  // Borders & Dividers
  border: {
    light: 'rgba(0, 0, 0, 0.08)',
    dark: 'rgba(255, 255, 255, 0.08)',
  },

  // UI Text Hierarchy
  text: {
    // Light
    primaryLight: '#111318',   // Near-black
    secondaryLight: '#687076', // Muted text
    
    // Dark
    primaryDark: '#EDEDEF',    // Near-white
    secondaryDark: '#8A8F98',  // Muted text
  },

  // Status Colors
  status: {
    error: '#ED5F74',
    warning: '#F5A623',
    success: '#34C759',
    info: '#5A60F5',
    // Crisis Protocol Safety Red override
    crisis: '#F85149', 
  }
};
