import { ChartTheme } from '@/lib/types/dynamic-charts/types';

export const LIGHT_THEME: ChartTheme = {
  colors: [
    'hsl(221.2 83.2% 53.3%)', // primary (blue)
    'hsl(142.1 76.2% 36.3%)', // green-600 (secondary)
    'hsl(346.8 77.2% 49.8%)', // rose-500 (accent)
    'hsl(24.6 95% 53.1%)', // orange-500
    'hsl(280 90% 57%)', // violet (softer purple)
  ],
  chart: {
    backgroundColor: 'transparent',
    style: {
      fontFamily: 'var(--font-sans)',
    },
  },
  title: {
    style: {
      color: 'hsl(222.2 47.4% 11.2%)', // slate-950
      fontSize: '16px',
    },
  },
  subtitle: {
    style: {
      color: 'hsl(215.4 16.3% 46.9%)', // slate-500
    },
  },
  xAxis: {
    labels: {
      style: {
        color: 'hsl(215.4 16.3% 46.9%)', // slate-500
      },
    },
    gridLineColor: 'hsl(214.3 31.8% 91.4%)', // slate-200
  },
  yAxis: {
    labels: {
      style: {
        color: 'hsl(215.4 16.3% 46.9%)', // slate-500
      },
    },
    gridLineColor: 'hsl(214.3 31.8% 91.4%)', // slate-200
  },
  legend: {
    itemStyle: {
      color: 'hsl(215.4 16.3% 46.9%)', // slate-500
    },
  },
  tooltip: {
    backgroundColor: 'hsl(0 0% 100%)', // white
    borderColor: 'hsl(214.3 31.8% 91.4%)', // slate-200
    style: {
      color: 'hsl(222.2 47.4% 11.2%)', // slate-950
    },
  },
  plotOptions: {
    area: {
      fillOpacity: 0.15, // slightly reduced for less visual noise
    },
    waterfall: {
      colors: {
        positive: 'hsl(142.1 76.2% 36.3%)', // green-600 - for positive values
        negative: 'hsl(221.2 83.2% 53.3%)', // primary blue - for negative values
      },
    },
  },
};

export const DARK_THEME: ChartTheme = {
  colors: [
    'hsl(217.2 91.2% 69.8%)', // primary blue (brighter for dark mode)
    'hsl(142.1 76.2% 66.3%)', // green-300 (brighter secondary)
    'hsl(346.8 77.2% 59.8%)', // rose-400 (accent)
    'hsl(24.6 95% 63.1%)', // orange-400
    'hsl(280 90% 67%)', // violet (softer purple)
  ],
  chart: {
    backgroundColor: 'transparent',
    style: {
      fontFamily: 'var(--font-sans)',
    },
  },
  title: {
    style: {
      color: 'hsl(210 40% 98%)', // slate-50
      fontSize: '16px',
    },
  },
  subtitle: {
    style: {
      color: 'hsl(215.4 16.3% 76.9%)', // slate-300
    },
  },
  xAxis: {
    labels: {
      style: {
        color: 'hsl(215.4 16.3% 76.9%)', // slate-300
      },
    },
    gridLineColor: 'hsl(215.4 16.3% 36.9%)', // slate-600 (higher contrast for dark mode)
  },
  yAxis: {
    labels: {
      style: {
        color: 'hsl(215.4 16.3% 76.9%)', // slate-300
      },
    },
    gridLineColor: 'hsl(215.4 16.3% 36.9%)', // slate-600 (higher contrast for dark mode)
  },
  legend: {
    itemStyle: {
      color: 'hsl(215.4 16.3% 76.9%)', // slate-300
    },
  },
  tooltip: {
    backgroundColor: 'hsl(222.2 84% 4.9%)', // slate-950
    borderColor: 'hsl(215.4 16.3% 36.9%)', // slate-600
    style: {
      color: 'hsl(210 40% 98%)', // slate-50
    },
  },
  plotOptions: {
    area: {
      fillOpacity: 0.1, // reduced for dark mode to avoid visual noise
    },
    waterfall: {
      colors: {
        positive: 'hsl(142.1 76.2% 66.3%)', // green-300 - for positive values
        negative: 'hsl(217.2 91.2% 69.8%)', // primary blue - for negative values
      },
    },
  },
};
