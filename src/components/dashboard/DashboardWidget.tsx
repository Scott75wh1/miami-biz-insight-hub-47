
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DashboardWidgetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function DashboardWidget({ 
  title, 
  children, 
  className 
}: DashboardWidgetProps) {
  return (
    <Card className={`p-4 rounded-2xl shadow-sm ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
