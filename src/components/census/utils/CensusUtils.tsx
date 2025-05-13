
import React from 'react';

// Helper function to render a progress bar
export const renderProgressBar = (value: number, max: number = 100, color: string = 'bg-blue-500') => (
  <div className="h-2 w-full bg-muted rounded-full mt-1">
    <div 
      className={`h-full ${color} rounded-full`} 
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
);

// Helper function to format numbers with commas
export const formatNumber = (num: number) => {
  return num.toLocaleString();
};

// Stat box component for reuse
export const StatBox = ({ value, label }: { value: string | number, label: string }) => (
  <div className="text-center p-3 bg-muted/30 rounded-md">
    <div className="text-lg font-semibold">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

// Progress item component for reuse
export const ProgressItem = ({ label, value, max = 100, color = 'bg-blue-500' }: 
  { label: string, value: number, max?: number, color?: string }) => (
  <div>
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    {renderProgressBar(value, max, color)}
  </div>
);
