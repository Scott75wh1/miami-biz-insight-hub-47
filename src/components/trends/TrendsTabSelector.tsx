
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TrendsTabSelectorProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const TrendsTabSelector: React.FC<TrendsTabSelectorProps> = ({ 
  selectedTab,
  onTabChange
}) => {
  return (
    <Tabs 
      value={selectedTab} 
      onValueChange={onTabChange}
      className="w-[260px]"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="general">Generale</TabsTrigger>
        <TabsTrigger value="district">Per Zona</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TrendsTabSelector;
