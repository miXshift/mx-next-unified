import { ChartTheme } from './types';

export const LIGHT_THEME: ChartTheme = {
  colors: [
    'hsl(217.2 91.2% 59.8%)', // blue-500 (for primary series)
    'hsl(142.1 70.6% 45.3%)', // green-500 (for secondary series)
    'hsl(346.8 77.2% 49.8%)', // rose-500
    'hsl(24.6 95% 53.1%)', // orange-500
    'hsl(262.1 83.3% 57.8%)', // purple-500
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
      fontWeight: '500',
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
      fillOpacity: 0.2,
    },
    waterfall: {
      colors: {
        positive: 'hsl(142.1 70.6% 45.3%)', // green-500 - match green in Sales Mix chart
        negative: 'hsl(217.2 91.2% 59.8%)', // blue-500 - Use primary blue instead of red
      },
    },
  },
};

export const DARK_THEME: ChartTheme = {
  colors: [
    'hsl(217.2 91.2% 69.8%)', // blue-400 (brighter for dark mode)
    'hsl(142.1 76.2% 56.3%)', // green-400 (brighter for dark mode)
    'hsl(346.8 77.2% 59.8%)', // rose-400
    'hsl(24.6 95% 63.1%)', // orange-400
    'hsl(262.1 83.3% 67.8%)', // purple-400
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
      fontWeight: '500',
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
    gridLineColor: 'hsl(215.4 16.3% 46.9%)', // slate-500
  },
  yAxis: {
    labels: {
      style: {
        color: 'hsl(215.4 16.3% 76.9%)', // slate-300
      },
    },
    gridLineColor: 'hsl(215.4 16.3% 46.9%)', // slate-500
  },
  legend: {
    itemStyle: {
      color: 'hsl(215.4 16.3% 76.9%)', // slate-300
    },
  },
  tooltip: {
    backgroundColor: 'hsl(217.2 32.6% 17.5%)', // slate-800
    borderColor: 'hsl(215.4 16.3% 46.9%)', // slate-500
    style: {
      color: 'hsl(210 40% 98%)', // slate-50
    },
  },
  plotOptions: {
    area: {
      fillOpacity: 0.1,
    },
    waterfall: {
      colors: {
        positive: 'hsl(142.1 84.2% 67.3%)', // green-300 - match green in Sales Mix chart
        negative: 'hsl(217.2 91.2% 85.8%)', // blue-200 - Use primary blue instead of red
      },
    },
  },
};
