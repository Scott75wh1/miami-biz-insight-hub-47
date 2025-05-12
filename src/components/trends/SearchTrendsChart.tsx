
import React from 'react';

interface TrendItem {
  label: string;
  value: number;
}

interface SearchTrendsChartProps {
  searchTrends: TrendItem[];
}

const SearchTrendsChart = ({ searchTrends }: SearchTrendsChartProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-3">Crescita delle Ricerche su Google</h4>
      <div className="space-y-2">
        {searchTrends.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{item.label}</span>
              <span className="font-medium">{item.value}%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full"
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchTrendsChart;
