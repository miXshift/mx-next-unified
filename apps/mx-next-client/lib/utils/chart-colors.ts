export const chartColors = {
  // Primary colors
  primary: 'hsl(222.2 47.4% 11.2%)', // slate-950
  primaryLight: 'hsl(217.2 32.6% 17.5%)', // slate-800

  // Accent colors
  accent: 'hsl(142.1 70.6% 45.3%)', // green-500
  accentLight: 'hsl(142.1 76.2% 36.3%)', // green-600

  // Status colors
  positive: 'hsl(143.8 61.2% 52.4%)', // green-400
  negative: 'hsl(346.8 77.2% 49.8%)', // rose-500
  warning: 'hsl(24.6 95% 53.1%)', // orange-500

  // Chart specific colors
  line: 'hsl(217.2 91.2% 59.8%)', // blue-500
  bar: 'hsl(142.1 70.6% 45.3%)', // green-500
  area: 'hsla(142.1 70.6% 45.3% / 0.2)', // green-500 with opacity

  // Text colors
  text: 'hsl(222.2 47.4% 11.2%)', // slate-950
  textMuted: 'hsl(215.4 16.3% 46.9%)', // slate-500

  // Background colors
  background: 'hsl(0 0% 100%)', // white
  backgroundMuted: 'hsl(210 40% 96.1%)', // slate-50

  // Dark mode colors
  dark: {
    primary: 'hsl(217.2 32.6% 17.5%)', // slate-800
    primaryLight: 'hsl(215.4 16.3% 46.9%)', // slate-500
    background: 'hsl(222.2 84% 4.9%)', // slate-950
    text: 'hsl(210 40% 98%)', // slate-50
    textMuted: 'hsl(215.4 16.3% 46.9%)', // slate-500
    accent: 'hsl(142.1 70.6% 45.3%)', // green-500
    positive: 'hsl(142.1 70.6% 45.3%)', // green-500
    negative: 'hsl(346.8 77.2% 49.8%)', // rose-500
    area: 'hsla(142.1 70.6% 45.3% / 0.1)', // green-500 with low opacity
  },
};

// Predefined color sequences for different chart types
export const chartSequences = {
  default: [
    chartColors.primary,
    chartColors.accent,
    chartColors.positive,
    chartColors.warning,
    chartColors.line,
  ],
  categorical: [
    'hsl(142.1 70.6% 45.3%)', // green-500
    'hsl(217.2 91.2% 59.8%)', // blue-500
    'hsl(346.8 77.2% 49.8%)', // rose-500
    'hsl(24.6 95% 53.1%)', // orange-500
    'hsl(262.1 83.3% 57.8%)', // purple-500
  ],
  sequential: [
    'hsl(142.1 76.2% 36.3%)', // green-600
    'hsl(142.1 70.6% 45.3%)', // green-500
    'hsl(142.1 69.2% 54.1%)', // green-400
    'hsl(142.1 70.6% 69.8%)', // green-300
    'hsl(142.1 71% 77.1%)', // green-200
  ],
};

interface ThemeColors {
  primary: string;
  primaryLight: string;
  background: string;
  text: string;
  textMuted: string;
  accent: string;
  positive: string;
  negative: string;
  area: string;
}

// Helper function to get theme-aware colors
export const getThemeColors = (isDarkMode: boolean): ThemeColors => {
  return {
    primary: isDarkMode ? chartColors.dark.primary : chartColors.primary,
    primaryLight: isDarkMode
      ? chartColors.dark.primaryLight
      : chartColors.primaryLight,
    background: isDarkMode
      ? chartColors.dark.background
      : chartColors.background,
    text: isDarkMode ? chartColors.dark.text : chartColors.text,
    textMuted: isDarkMode ? chartColors.dark.textMuted : chartColors.textMuted,
    accent: isDarkMode ? chartColors.dark.accent : chartColors.accent,
    positive: isDarkMode ? chartColors.dark.positive : chartColors.positive,
    negative: isDarkMode ? chartColors.dark.negative : chartColors.negative,
    area: isDarkMode ? chartColors.dark.area : chartColors.area,
  };
};
