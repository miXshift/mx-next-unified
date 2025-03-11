'use client';

import { Card } from '@/lib/ui/card';
import { DynamicChart } from './index';
import type {
  ChartSchema,
  ChartTypePlugin,
  DataTransformation,
  TooltipPoint,
} from './types';
import { useTheme } from 'next-themes';
import { registerChartType } from './plugins';
import { useState, useMemo } from 'react';
import { Button } from '@/lib/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/ui/select';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Account Changes Data
const ACCOUNT_CHANGES_DATA = [
  {
    name: 'ASP - MicroFlex - 93256 - Case - 1P - VR',
    value: 11505.65,
    isPositive: true,
  },
  {
    name: 'MSP - MicroFlex - 93732 - B0B94JMKQ8 - CQ - BOOST - PT - VR',
    value: 11422.44,
    isPositive: true,
  },
  {
    name: 'SBV - MicroFlex - 93256 - Disp - CQ - 1P - VR',
    value: 11385.1,
    isPositive: true,
  },
  {
    name: 'MSP - MicroFlex - 93732 - B0B94PC694 - CQ - B2B - BOOST - PT - VR',
    value: 11370.61,
    isPositive: true,
  },
  {
    name: 'MSP - MicroFlex - 93732 - B0B94LCDHM - KW - BOOST - Size - VR',
    value: 11359.18,
    isPositive: true,
  },
  { name: 'ASP - HyFlex - 11840 - VR', value: -1314.25, isPositive: false },
  { name: 'ASP - MicroFlex - MF-300 - VR', value: -1411.54, isPositive: false },
  {
    name: 'ASP - MicroFlex - DFK-608 - 1P - VR',
    value: -1425.85,
    isPositive: false,
  },
  {
    name: 'ASP - MicroFlex - MK-296 - 1P - VR',
    value: -1566.41,
    isPositive: false,
  },
  { name: 'SBV - MicroFlex - MF-300 - VR', value: -1714.54, isPositive: false },
  { name: 'Sum of Selection', value: -5389.6, isTotal: true },
  { name: 'Total Account Change', value: -15863.97, isTotal: true },
];

// Sales Mix Data
const SALES_MIX_DATA = [
  { date: '01/20/24', adSales: 1200, productSales: 5000, adsPercent: 45 },
  { date: '02/20/24', adSales: 2500, productSales: 22000, adsPercent: 55 },
  { date: '03/20/24', adSales: 1800, productSales: 8000, adsPercent: 50 },
  { date: '04/20/24', adSales: 2200, productSales: 10000, adsPercent: 48 },
  { date: '05/20/24', adSales: 1500, productSales: 7000, adsPercent: 52 },
  { date: '06/20/24', adSales: 3000, productSales: 15000, adsPercent: 58 },
  { date: '07/20/24', adSales: 2800, productSales: 12000, adsPercent: 54 },
  { date: '08/20/24', adSales: 2000, productSales: 9000, adsPercent: 51 },
];

// Advertising Return Data
const AD_RETURN_DATA = [
  { date: '11/20/23', cpa: 8, aov: 35, roas: 6.5 },
  { date: '12/20/23', cpa: 12, aov: 42, roas: 8.2 },
  { date: '01/20/24', cpa: 10, aov: 38, roas: 7.8 },
  { date: '02/20/24', cpa: 15, aov: 45, roas: 9.5 },
  { date: '03/20/24', cpa: 11, aov: 40, roas: 8.8 },
  { date: '04/20/24', cpa: 13, aov: 43, roas: 9.2 },
  { date: '05/20/24', cpa: 9, aov: 37, roas: 7.5 },
  { date: '06/20/24', cpa: 14, aov: 44, roas: 9.0 },
];

// Revenue Distribution Data
const REVENUE_DISTRIBUTION_DATA = [
  { category: 'Product A', value: 35000 },
  { category: 'Product B', value: 28000 },
  { category: 'Product C', value: 18500 },
  { category: 'Product D', value: 12000 },
  { category: 'Product E', value: 9500 },
  { category: 'Other Products', value: 7000 },
];

// Revenue Trend Data (adding a more specific dataset for this chart)
const REVENUE_TREND_DATA = [
  { month: 'Jan', revenue: 28000 },
  { month: 'Feb', revenue: 32000 },
  { month: 'Mar', revenue: 27500 },
  { month: 'Apr', revenue: 35000 },
  { month: 'May', revenue: 42000 },
  { month: 'Jun', revenue: 38000 },
];

// Register a custom chart type plugin - Trend indicator
const trendIndicatorPlugin: ChartTypePlugin = {
  type: 'trend-indicator',
  processData: (data, schema) => {
    const categoryKey = 'category';
    const valueKey = 'value';

    // Process data to extract values and determine trends
    const processedData = data.map(item => {
      const value = parseFloat(item[valueKey]);
      const isPositive = value >= 10000; // Consider values >= 10000 as positive trends

      return {
        name: item[categoryKey],
        y: value,
        color: isPositive ? '#22c55e' : '#ef4444', // green for positive, red for negative
        trend: isPositive ? 'positive' : 'negative',
      };
    });

    return {
      series: [
        {
          name: 'Trend',
          data: processedData,
          type: 'column',
          colorByPoint: true,
        },
      ],
    };
  },
  formatTooltip: (tooltipContext, schema) => {
    const point = tooltipContext.point;
    if (!point) return '';

    const trend = point.trend === 'positive' ? '↗️ Growing' : '↘️ Declining';
    return `<b>${point.name}</b><br>Value: $${point.y.toLocaleString()}<br>Trend: ${trend}`;
  },
  defaultOptions: {
    chart: {
      height: 400,
    },
    title: {
      text: 'Trend Indicators',
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        borderRadius: 5,
      },
    },
  },
};

// Register the custom plugin
if (typeof window !== 'undefined') {
  registerChartType(trendIndicatorPlugin);
}

export function DynamicChartDemo() {
  const { resolvedTheme } = useTheme();

  console.log('resolvedTheme', resolvedTheme);

  // Handle chart ready event
  const handleChartReady = (chart: any) => {
    console.log('Chart ready:', chart);
    console.log('Chart series:', chart.series);
    console.log('Chart series data:', chart.series[0]?.points?.length);
    // You can manipulate the chart here if needed
  };

  // Handle point click event
  const handlePointClick = (point: any) => {
    console.log('Point clicked:', point);
  };

  // Use useMemo for the Account Changes chart options to prevent unnecessary re-renders
  const accountChangesOptions = useMemo(
    () => ({
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
        height: 500,
        style: {
          fontFamily: 'inherit',
        },
      },
      title: {
        text: 'Account Changes',
        align: 'left',
        style: {
          color: resolvedTheme === 'dark' ? '#f8fafc' : '#0f172a',
          fontSize: '16px',
          fontWeight: '500',
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: '',
          showInLegend: false,
          data: ACCOUNT_CHANGES_DATA.map(item => ({
            name: item.name,
            y: item.value,
            color: item.isTotal
              ? '#0f172a'
              : item.isPositive
                ? '#16a34a'
                : '#2563eb',
          })),
        },
      ],
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '11px',
            color: resolvedTheme === 'dark' ? '#cbd5e1' : '#64748b',
          },
        },
      },
      yAxis: {
        title: {
          text: 'Value ($)',
          style: {
            color: resolvedTheme === 'dark' ? '#cbd5e1' : '#64748b',
          },
        },
        labels: {
          style: {
            color: resolvedTheme === 'dark' ? '#cbd5e1' : '#64748b',
          },
        },
        gridLineColor: resolvedTheme === 'dark' ? '#334155' : '#e2e8f0',
      },
      plotOptions: {
        column: {
          borderWidth: 0,
          pointPadding: 0.1,
          groupPadding: 0.1,
        },
      },
      tooltip: {
        useHTML: true,
        formatter: function (this: any): string {
          const value = this.y;
          if (typeof value !== 'number') return '';

          // Format the value with proper currency
          const formattedValue =
            value >= 0
              ? `+$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : `-$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

          // Check if we have item.isTotal to style differently
          const isTotal = ACCOUNT_CHANGES_DATA.find(
            item => item.name === this.key
          )?.isTotal;

          if (isTotal) {
            return `<div style="font-weight: bold;">${this.key}</div><div style="font-size: 14px; color: ${
              resolvedTheme === 'dark' ? '#f8fafc' : '#0f172a'
            };">${formattedValue}</div>`;
          }

          return `<div style="font-weight: bold;">${this.key}</div><div style="font-size: 14px;">${formattedValue}</div>`;
        },
      },
    }),
    [resolvedTheme]
  ); // Add resolvedTheme as a dependency

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {/* Account Changes Chart - Direct implementation in Card */}
      <Card className="p-6">
        {/* Debug output */}
        {(() => {
          console.log('ACCOUNT_CHANGES_DATA:', ACCOUNT_CHANGES_DATA);
          return null;
        })()}

        <HighchartsReact
          highcharts={Highcharts}
          options={accountChangesOptions}
        />
      </Card>

      {/* Sales Mix Chart */}
      <Card className="p-6">
        <DynamicChart
          type="mixed"
          data={SALES_MIX_DATA}
          schema={{
            xKey: 'date',
            series: [
              { key: 'adSales', name: 'Ad Sales', type: 'column' },
              {
                key: 'productSales',
                name: 'Ordered Product Sales',
                type: 'column',
              },
              {
                key: 'adsPercent',
                name: 'Ads % of Tot. Sales',
                type: 'line',
                yAxis: 1,
              },
            ],
          }}
          options={{
            title: {
              text: 'Sales Mix',
              align: 'left',
            },
            xAxis: {
              categories: SALES_MIX_DATA.map(item => item.date),
              labels: {
                rotation: -45,
                style: {
                  fontSize: '11px',
                },
              },
            },
            yAxis: [
              {
                // First Y-axis for sales values
                title: {
                  text: 'Sales ($)',
                  style: {
                    color: resolvedTheme === 'dark' ? '#cbd5e1' : '#64748b',
                  },
                },
                labels: {
                  format: '${value:,.0f}',
                  style: {
                    color: resolvedTheme === 'dark' ? '#cbd5e1' : '#64748b',
                  },
                },
                gridLineWidth: 1,
                gridLineColor: resolvedTheme === 'dark' ? '#334155' : '#e2e8f0',
                showEmpty: false,
              },
              {
                // Second Y-axis for percentage
                title: {
                  text: 'Percentage',
                  style: {
                    color: resolvedTheme === 'dark' ? '#cbd5e1' : '#64748b',
                  },
                },
                labels: {
                  format: '{value}%',
                  style: {
                    color: resolvedTheme === 'dark' ? '#cbd5e1' : '#64748b',
                  },
                },
                opposite: true,
                max: 100,
                gridLineWidth: 0,
                showEmpty: false,
              },
            ],
            tooltip: {
              shared: true,
              useHTML: true,
              headerFormat: '',
              pointFormat: '',
              footerFormat: '',
              crosshairs: true,
              followPointer: true,
              outside: true,
              formatter: function () {
                if (this.points && this.points.length > 0) {
                  const dateStr = this.points[0].category;
                  let html = `<b>${dateStr}</b><br/>`;

                  // Sort points to ensure consistent order
                  const sortedPoints = [...this.points].sort((a, b) => {
                    const seriesOrder = [
                      'Ad Sales',
                      'Ordered Product Sales',
                      'Ads % of Tot. Sales',
                    ];
                    const aIndex = seriesOrder.indexOf(a.series.name);
                    const bIndex = seriesOrder.indexOf(b.series.name);

                    if (aIndex >= 0 && bIndex >= 0) {
                      return aIndex - bIndex;
                    }

                    return 0;
                  });

                  sortedPoints.forEach(point => {
                    const value = point.y;
                    let formattedValue = '';

                    if (point.series.name.includes('%')) {
                      formattedValue = `${value.toFixed(1)}%`;
                    } else {
                      formattedValue = `$${value.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`;
                    }

                    html += `<span style="color:${point.series.color}">\u25CF</span> ${point.series.name}: <b>${formattedValue}</b><br/>`;
                  });

                  return html;
                }
                return '';
              },
            },
            plotOptions: {
              series: {
                marker: {
                  enabled: true,
                  symbol: 'circle',
                },
              },
              column: {
                borderWidth: 0,
                tooltip: {
                  valueSuffix: '$',
                },
              },
              line: {
                tooltip: {
                  valueSuffix: '%',
                },
              },
            },
            series: [
              {
                name: 'Ad Sales',
                type: 'column',
                data: SALES_MIX_DATA.map(item => item.adSales),
                tooltipSuffix: '$',
              },
              {
                name: 'Ordered Product Sales',
                type: 'column',
                data: SALES_MIX_DATA.map(item => item.productSales),
                tooltipSuffix: '$',
              },
              {
                name: 'Ads % of Tot. Sales',
                type: 'line',
                yAxis: 1,
                data: SALES_MIX_DATA.map(item => item.adsPercent),
                tooltipSuffix: '%',
              },
            ],
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
            },
          }}
        />
      </Card>

      {/* Advertising Return Chart */}
      <Card className="p-6">
        <DynamicChart
          type="mixed"
          data={AD_RETURN_DATA}
          schema={{
            xKey: 'date',
            series: [
              { key: 'cpa', name: 'CPA', type: 'area' },
              { key: 'aov', name: 'AOV', type: 'area' },
              { key: 'roas', name: 'ROAS', type: 'line', yAxis: 1 },
            ],
          }}
          options={{
            title: {
              text: 'Advertising Return',
              align: 'left',
            },
            xAxis: {
              categories: AD_RETURN_DATA.map(item => item.date),
              labels: {
                rotation: -45,
                style: {
                  fontSize: '11px',
                },
              },
            },
            yAxis: [
              {
                // First Y-axis for CPA and AOV
                title: {
                  text: 'Value ($)',
                  style: {
                    color: resolvedTheme === 'dark' ? '#cbd5e1' : '#64748b',
                  },
                },
                labels: {
                  format: '${value:,.0f}',
                  style: {
                    color: resolvedTheme === 'dark' ? '#cbd5e1' : '#64748b',
                  },
                },
                gridLineWidth: 1,
                gridLineColor: resolvedTheme === 'dark' ? '#334155' : '#e2e8f0',
                showEmpty: false,
              },
              {
                // Second Y-axis for ROAS
                title: {
                  text: 'ROAS',
                  style: {
                    color: resolvedTheme === 'dark' ? '#cbd5e1' : '#64748b',
                  },
                },
                labels: {
                  format: '{value}x',
                  style: {
                    color: resolvedTheme === 'dark' ? '#cbd5e1' : '#64748b',
                  },
                },
                opposite: true,
                gridLineWidth: 0,
                showEmpty: false,
              },
            ],
            tooltip: {
              shared: true,
              useHTML: true,
              headerFormat: '',
              pointFormat: '',
              footerFormat: '',
              crosshairs: true,
              followPointer: true,
              outside: true,
              formatter: function () {
                if (this.points && this.points.length > 0) {
                  const dateStr = this.points[0].category;
                  let html = `<b>${dateStr}</b><br/>`;

                  // Sort points to ensure consistent order
                  const sortedPoints = [...this.points].sort((a, b) => {
                    const seriesOrder = ['CPA', 'AOV', 'ROAS'];
                    const aIndex = seriesOrder.indexOf(a.series.name);
                    const bIndex = seriesOrder.indexOf(b.series.name);

                    if (aIndex >= 0 && bIndex >= 0) {
                      return aIndex - bIndex;
                    }

                    return 0;
                  });

                  sortedPoints.forEach(point => {
                    const value = point.y;
                    let formattedValue = '';

                    if (point.series.name === 'ROAS') {
                      formattedValue = `${value.toFixed(1)}x`;
                    } else {
                      formattedValue = `$${value.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`;
                    }

                    html += `<span style="color:${point.series.color}">\u25CF</span> ${point.series.name}: <b>${formattedValue}</b><br/>`;
                  });

                  return html;
                }
                return '';
              },
            },
            plotOptions: {
              series: {
                marker: {
                  enabled: true,
                  symbol: 'circle',
                },
              },
              area: {
                fillOpacity: 0.25,
                tooltip: {
                  valueSuffix: '$',
                },
              },
              line: {
                tooltip: {
                  valueSuffix: 'x',
                },
              },
            },
            series: [
              {
                name: 'CPA',
                type: 'area',
                data: AD_RETURN_DATA.map(item => item.cpa),
                tooltipSuffix: '$',
              },
              {
                name: 'AOV',
                type: 'area',
                data: AD_RETURN_DATA.map(item => item.aov),
                tooltipSuffix: '$',
              },
              {
                name: 'ROAS',
                type: 'line',
                yAxis: 1,
                data: AD_RETURN_DATA.map(item => item.roas),
                tooltipSuffix: 'x',
              },
            ],
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
            },
          }}
        />
      </Card>

      {/* Revenue Distribution Chart */}
      <Card className="p-6">
        <DynamicChart
          type="pie"
          data={REVENUE_DISTRIBUTION_DATA}
          schema={{
            categoryKey: 'category',
            valueKey: 'value',
          }}
          options={{
            title: {
              text: 'Revenue Distribution',
              align: 'left',
            },
            height: 500,
            theme: resolvedTheme as 'light' | 'dark',
            chart: {
              backgroundColor: 'transparent',
              style: {
                fontFamily: 'inherit',
              },
              options3d: {
                enabled: true,
                alpha: 45,
                beta: 0,
              },
            },
            plotOptions: {
              series: {
                allowPointSelect: true,
                cursor: 'pointer',
                borderWidth: 2,
                borderColor:
                  resolvedTheme === 'dark'
                    ? 'hsl(222.2 84% 4.9%)'
                    : 'hsl(0 0% 100%)',
                innerSize: '40%',
                depth: 35,
              },
            },
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f}%',
              distance: 20,
              style: {
                color:
                  resolvedTheme === 'dark'
                    ? 'hsl(210 40% 98%)'
                    : 'hsl(222.2 47.4% 11.2%)',
                textOutline: 'none',
              },
            },
            tooltip: {
              useHTML: true,
              headerFormat: '',
              pointFormat: '',
              footerFormat: '',
              followPointer: true,
              outside: true,
            },
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
            },
          }}
        />
      </Card>

      {/* Revenue Trend Chart */}
      <Card className="p-6">
        <DynamicChart
          type="line"
          data={REVENUE_TREND_DATA}
          schema={{
            xKey: 'month',
            yKey: 'revenue',
          }}
          options={{
            title: {
              text: 'Revenue Trend',
              align: 'left',
            },
            chart: {
              backgroundColor: 'transparent',
              style: {
                fontFamily: 'inherit',
              },
              height: 400,
            },
            yAxis: {
              title: {
                text: 'Revenue ($)',
                style: {
                  color: resolvedTheme === 'dark' ? '#cbd5e1' : '#64748b',
                },
              },
              labels: {
                formatter: function () {
                  return '$' + this.value.toLocaleString();
                },
                style: {
                  color: resolvedTheme === 'dark' ? '#cbd5e1' : '#64748b',
                },
              },
              gridLineColor: resolvedTheme === 'dark' ? '#334155' : '#e2e8f0',
            },
            tooltip: {
              useHTML: true,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderWidth: 1,
              borderColor: '#dddddd',
              borderRadius: 8,
              shadow: true,
              style: {
                fontSize: '12px',
                fontFamily: 'inherit',
              },
              headerFormat: '',
              pointFormat: '',
              footerFormat: '',
              followPointer: true,
            },
            plotOptions: {
              series: {
                marker: {
                  enabled: true,
                  symbol: 'circle',
                  radius: 5,
                },
              },
            },
            series: [
              {
                id: 'revenue-trend',
                name: 'Revenue',
                data: REVENUE_TREND_DATA.map(item => item.revenue),
                color: '#4a6cf7',
                lineWidth: 3,
              },
            ],
            legend: {
              enabled: false,
            },
          }}
          interactiveOptions={{
            zoom: true,
            pan: true,
            export: true,
          }}
        />
      </Card>

      {/* Custom Plugin Chart - Trend Indicator */}
      <Card className="p-6">
        <DynamicChart
          type="trend-indicator"
          data={REVENUE_DISTRIBUTION_DATA}
          schema={{
            categoryKey: 'category',
            valueKey: 'value',
          }}
          options={{
            title: {
              text: 'Revenue Trends',
              align: 'left',
            },
            chart: {
              backgroundColor: 'transparent',
              style: {
                fontFamily: 'inherit',
              },
              height: 500,
            },
            yAxis: {
              title: {
                text: 'Revenue ($)',
                style: {
                  color: resolvedTheme === 'dark' ? '#cbd5e1' : '#64748b',
                },
              },
              labels: {
                style: {
                  color: resolvedTheme === 'dark' ? '#cbd5e1' : '#64748b',
                },
              },
              gridLineColor: resolvedTheme === 'dark' ? '#334155' : '#e2e8f0',
            },
            tooltip: {
              useHTML: true,
              headerFormat: '',
              pointFormat: '',
              footerFormat: '',
              followPointer: true,
              outside: true,
            },
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
            },
            xAxis: {
              labels: {
                rotation: 0,
                style: {
                  fontSize: '11px',
                },
              },
            },
          }}
        />
      </Card>
    </div>
  );
}
