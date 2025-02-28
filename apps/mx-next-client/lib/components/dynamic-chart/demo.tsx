'use client';

import { Card } from '@/lib/ui/card';
import { DynamicChart } from './index';
import type { ChartSchema } from './types';
import { useTheme } from 'next-themes';

// Account Changes Data
const ACCOUNT_CHANGES_DATA = [
  {
    name: 'ASP - MicroFlex - 93256 - Case - 1P - VR',
    value: 505.65,
    isPositive: true,
  },
  {
    name: 'MSP - MicroFlex - 93732 - B0B94JMKQ8 - CQ - BOOST - PT - VR',
    value: 422.44,
    isPositive: true,
  },
  {
    name: 'SBV - MicroFlex - 93256 - Disp - CQ - 1P - VR',
    value: 385.1,
    isPositive: true,
  },
  {
    name: 'MSP - MicroFlex - 93732 - B0B94PC694 - CQ - B2B - BOOST - PT - VR',
    value: 370.61,
    isPositive: true,
  },
  {
    name: 'MSP - MicroFlex - 93732 - B0B94LCDHM - KW - BOOST - Size - VR',
    value: 359.18,
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
            title: 'Account Changes',
            height: 500,
            theme: resolvedTheme as 'light' | 'dark',
            chart: {
              backgroundColor: 'transparent',
            },
            yAxisLabel: '$ Change',
            plotOptions: {
              column: {
                colorByPoint: true,
                grouping: false,
                pointPadding: 0.1,
                borderWidth: 0,
              },
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
            title: 'Sales Mix',
            height: 400,
            theme: resolvedTheme as 'light' | 'dark',
            chart: {
              backgroundColor: 'transparent',
            },
            yAxis: [
              { title: { text: 'Sales ($)' } },
              { title: { text: 'Percentage' }, opposite: true, max: 100 },
            ],
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
            title: 'Advertising Return',
            height: 400,
            theme: resolvedTheme as 'light' | 'dark',
            chart: {
              backgroundColor: 'transparent',
            },
            yAxis: [
              { title: { text: 'Value ($)' } },
              { title: { text: 'ROAS' }, opposite: true },
            ],
          }}
        />
      </Card>
    </div>
  );
}
