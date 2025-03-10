import {
  ChartSchema,
  ChartType,
  HeatmapChartSchema,
  PieChartSchema,
  WaterfallChartSchema,
} from '../types';

/**
 * Format tooltip for different chart types
 * @param tooltipContext The tooltip context
 * @param type The chart type
 * @param schema The schema to use
 * @returns The formatted tooltip HTML
 */
export function formatTooltip(
  tooltipContext: any,
  type: ChartType,
  schema: ChartSchema
): string {
  // Shared tooltip showing multiple series
  if (tooltipContext.points && tooltipContext.points.length > 0) {
    // Skip showing tooltips for waterfall charts (handled by single point case)
    if (type === 'waterfall') {
      const point = tooltipContext.points[0];
      const value = point.y;
      // Format the value with proper currency
      const formattedValue =
        value >= 0
          ? `+$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : `-$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      // Show the point name without any series labels
      if (point.key || (point.point && point.point.name)) {
        const name = point.key || (point.point && point.point.name);
        return `<b>${name}</b><br/>${formattedValue}`;
      }

      // Fallback
      return `<b>${formattedValue}</b>`;
    }

    const dateStr =
      tooltipContext.points[0].x instanceof Date
        ? tooltipContext.points[0].x.toLocaleDateString()
        : tooltipContext.points[0].x;

    let html = `<b>${dateStr}</b><br/>`;

    // Sort points to ensure consistent order
    const sortedPoints = [...tooltipContext.points].sort((a, b) => {
      // Define a specific order for series names if needed
      const seriesOrder = [
        'Ad Sales',
        'Ordered Product Sales',
        'Ads % of Tot. Sales',
        'CPA',
        'AOV',
        'ROAS',
      ];
      const aIndex = seriesOrder.indexOf(a.series.name);
      const bIndex = seriesOrder.indexOf(b.series.name);

      if (aIndex >= 0 && bIndex >= 0) {
        return aIndex - bIndex;
      }

      return 0; // Keep original order if not in the predefined list
    });

    sortedPoints.forEach((point: any) => {
      const value = point.y;

      if (typeof value === 'number') {
        // Format based on series name or type
        let formattedValue = '';

        if (point.series.name.includes('ROAS')) {
          formattedValue = `${value.toFixed(1)}x`;
        } else if (point.series.name.includes('%')) {
          formattedValue = `${value.toFixed(1)}%`;
        } else {
          // Assume monetary value by default
          formattedValue = `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }

        html += `<span style="color:${point.series.color}">\u25CF</span> ${point.series.name}: <b>${formattedValue}</b><br/>`;
      }
    });

    return html;
  }

  // Single point tooltip
  switch (type) {
    case 'pie': {
      const { categoryKey, valueKey } = schema as PieChartSchema;
      const value = tooltipContext.y;
      return `<b>${tooltipContext.point.name}</b>: $${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    case 'heatmap': {
      const { xKey, yKey, valueKey } = schema as HeatmapChartSchema;
      const xCategory =
        tooltipContext.series.xAxis.categories[tooltipContext.point.x];
      const yCategory =
        tooltipContext.series.yAxis.categories[tooltipContext.point.y];
      const value = tooltipContext.point.value;
      return `<b>${xCategory}, ${yCategory}</b>: ${value}`;
    }
    case 'waterfall': {
      const value = tooltipContext.y;

      // Format the value with proper currency
      const formattedValue =
        value >= 0
          ? `+$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : `-$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      // For waterfall charts, just display the name and value directly, no series name or labels
      if (tooltipContext.point && tooltipContext.point.name) {
        return `<b>${tooltipContext.point.name}</b><br/>${formattedValue}`;
      }

      // Fallback if name isn't available
      return `<b>${formattedValue}</b>`;
    }
    case 'column': {
      const value = tooltipContext.y;
      // Format value with proper currency
      const formattedValue =
        value >= 0
          ? `+$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : `-$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      // Just return the formatted value without any additional elements
      return `<b>${formattedValue}</b>`;
    }
    case 'mixed': {
      const seriesName = tooltipContext.series.name;
      const value = tooltipContext.y;

      let formattedValue = '';
      if (seriesName.includes('ROAS')) {
        formattedValue = `${value.toFixed(1)}x`;
      } else if (seriesName.includes('%')) {
        formattedValue = `${value.toFixed(1)}%`;
      } else {
        formattedValue = `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }

      return `<span style="color:${tooltipContext.series.color}">\u25CF</span> ${seriesName}: <b>${formattedValue}</b>`;
    }
    default: {
      const value = tooltipContext.y;
      return `<span style="color:${tooltipContext.series.color}">\u25CF</span> ${tooltipContext.series.name}: <b>${value.toLocaleString()}</b>`;
    }
  }
}
