import { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, CandlestickSeries, HistogramSeries } from 'lightweight-charts';
import { OHLCData } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface CandlestickChartProps {
  data: OHLCData[];
  height?: number;
  className?: string;
}

type Period = '1일' | '1주' | '1개월' | '3개월';

export const CandlestickChart = ({ data, height = 300, className }: CandlestickChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('1개월');

  const chartTextColor = '#64748B';
  const chartGridColor = 'rgba(148, 163, 184, 0.16)';
  const chartBorderColor = '#E2E8F0';

  const periods: Period[] = ['1일', '1주', '1개월', '3개월'];

  const getFilteredData = (): OHLCData[] => {
    let daysToShow = 30;

    switch (selectedPeriod) {
      case '1일':
        daysToShow = 1;
        break;
      case '1주':
        daysToShow = 7;
        break;
      case '1개월':
        daysToShow = 30;
        break;
      case '3개월':
        daysToShow = 90;
        break;
    }

    return data.slice(-daysToShow);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: height,
      layout: {
        background: { color: 'transparent' },
        textColor: chartTextColor,
      },
      grid: {
        vertLines: {
          color: chartGridColor,
        },
        horzLines: {
          color: chartGridColor,
        },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: chartBorderColor,
      },
      timeScale: {
        borderColor: chartBorderColor,
        timeVisible: false,
      },
    });

    chartRef.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#EF4444',        // 상승 (Red for up - Korean convention)
      downColor: '#3B82F6',      // 하락 (Blue for down - Korean convention)
      wickUpColor: '#EF4444',
      wickDownColor: '#3B82F6',
      borderVisible: false,
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    });

    chart.priceScale('').applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    const filteredData = getFilteredData();

    const volumeData = filteredData.map((item) => ({
      time: item.time,
      value: item.volume,
      color: item.close >= item.open ? '#EF4444' : '#3B82F6',
    }));

    candleSeries.setData(filteredData);
    volumeSeries.setData(volumeData);

    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: containerRef.current.clientWidth,
        });
        chartRef.current.timeScale().fitContent();
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
    };
  }, [data, height, selectedPeriod]);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex gap-4 mb-4 border-b border-border">
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={cn(
              'pb-2 px-3 text-sm font-medium transition-colors relative',
              selectedPeriod === period
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {period}
            {selectedPeriod === period && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      <div ref={containerRef} style={{ height: `${height}px` }} />
    </div>
  );
};
