import { ChartTheme } from './types';

export const LIGHT_THEME: ChartTheme = {
  colors: [
    '#2563eb', // blue-600
    '#16a34a', // green-600
    '#dc2626', // red-600
    '#ca8a04', // yellow-600
    '#9333ea', // purple-600
    '#0891b2', // cyan-600
    '#ea580c', // orange-600
  ],
  chart: {
    backgroundColor: '#ffffff',
    style: {
      fontFamily: 'var(--font-sans)',
    },
  },
  title: {
    style: {
      color: '#0f172a', // slate-900
    },
  },
  subtitle: {
    style: {
      color: '#475569', // slate-600
    },
  },
  xAxis: {
    labels: {
      style: {
        color: '#475569', // slate-600
      },
    },
    gridLineColor: '#e2e8f0', // slate-200
  },
  yAxis: {
    labels: {
      style: {
        color: '#475569', // slate-600
      },
    },
    gridLineColor: '#e2e8f0', // slate-200
  },
  legend: {
    itemStyle: {
      color: '#475569', // slate-600
    },
  },
  tooltip: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0', // slate-200
    style: {
      color: '#0f172a', // slate-900
    },
  },
};

export const DARK_THEME: ChartTheme = {
  colors: [
    '#3b82f6', // blue-500
    '#22c55e', // green-500
    '#ef4444', // red-500
    '#eab308', // yellow-500
    '#a855f7', // purple-500
    '#06b6d4', // cyan-500
    '#f97316', // orange-500
  ],
  chart: {
    backgroundColor: '#1e293b', // slate-800
    style: {
      fontFamily: 'var(--font-sans)',
    },
  },
  title: {
    style: {
      color: '#f8fafc', // slate-50
    },
  },
  subtitle: {
    style: {
      color: '#cbd5e1', // slate-300
    },
  },
  xAxis: {
    labels: {
      style: {
        color: '#cbd5e1', // slate-300
      },
    },
    gridLineColor: '#334155', // slate-700
  },
  yAxis: {
    labels: {
      style: {
        color: '#cbd5e1', // slate-300
      },
    },
    gridLineColor: '#334155', // slate-700
  },
  legend: {
    itemStyle: {
      color: '#cbd5e1', // slate-300
    },
  },
  tooltip: {
    backgroundColor: '#1e293b', // slate-800
    borderColor: '#334155', // slate-700
    style: {
      color: '#f8fafc', // slate-50
    },
  },
};
