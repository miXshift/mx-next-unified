'use client';

import { Card } from '@/lib/ui/card';
import { DynamicChart } from './index';
import type { ChartSchema, TooltipPoint } from './types';
import { useTheme } from 'next-themes';

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

export function DynamicChartDemo() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {/* Account Changes Chart */}
      <Card className="p-6">
        <DynamicChart
          type="column"
          data={ACCOUNT_CHANGES_DATA}
          schema={{
            categoryKey: 'name',
            valueKey: 'value',
          }}
          options={{
            title: {
              text: 'Account Changes',
              align: 'left',
            },
            height: 500,
            theme: resolvedTheme as 'light' | 'dark',
            chart: {
              backgroundColor: 'transparent',
              style: {
                fontFamily: 'inherit',
              },
            },
            yAxisLabel: '$ Change',
            plotOptions: {
              column: {
                colorByPoint: true,
                grouping: false,
                pointPadding: 0.1,
                borderWidth: 0,
                dataLabels: {
                  enabled: true,
                  formatter: function () {
                    const value = this.y;
                    if (typeof value !== 'number') return '';

                    return value >= 0
                      ? `+$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : `-$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                  },
                },
              },
            },
            tooltip: {
              useHTML: true,
              headerFormat: '',
              pointFormat: '',
              footerFormat: '',
              followPointer: true,
              formatter: function () {
                const value = this.y;
                if (typeof value !== 'number') return '';

                const formattedValue =
                  value >= 0
                    ? `+$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : `-$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

                return `<b>${formattedValue}</b>`;
              },
            },
            legend: {
              enabled: false, // Hide the legend specifically to remove "value" label
            },
          }}
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
            },
            yAxis: [
              {
                title: { text: 'Sales ($)' },
                labels: {
                  format: '${value:,.0f}',
                },
              },
              {
                title: { text: 'Percentage' },
                labels: {
                  format: '{value}%',
                },
                opposite: true,
                max: 100,
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
              formatter: function () {
                if (this.points && this.points.length > 0) {
                  const dateStr = this.points[0].x;
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
                      formattedValue = `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
              align: 'right',
              verticalAlign: 'middle',
              layout: 'vertical',
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
            },
            yAxis: [
              {
                title: { text: 'Value ($)' },
                labels: {
                  format: '${value:,.0f}',
                },
              },
              {
                title: { text: 'ROAS' },
                labels: {
                  format: '{value}x',
                },
                opposite: true,
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
              formatter: function () {
                if (this.points && this.points.length > 0) {
                  const dateStr = this.points[0].x;
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
                      formattedValue = `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
              align: 'right',
              verticalAlign: 'middle',
              layout: 'vertical',
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
            },
            legend: {
              enabled: true,
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle',
            },
          }}
        />
      </Card>
    </div>
  );
}
