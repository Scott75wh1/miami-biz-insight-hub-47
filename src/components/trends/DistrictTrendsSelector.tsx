
import React from 'react';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { Check, ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';

const DEFAULT_DISTRICTS = ["Miami Beach", "Wynwood", "Brickell"];

const DistrictTrendsSelector = () => {
  // Safe access to district selection with fallback
  let districts = DEFAULT_DISTRICTS;
  let selectedDistrict = "Miami Beach";
  let handleDistrictChange = (district: string) => {
    console.log(`District changed to: ${district} (default handler)`);
    // Default handler that doesn't actually do anything
  };
  
  try {
    // Try to use the district selection hook, but don't crash if it's not available
    const districtContext = useDistrictSelection();
    districts = districtContext.districts;
    selectedDistrict = districtContext.selectedDistrict;
    handleDistrictChange = districtContext.handleDistrictChange;
  } catch (error) {
    console.warn("District selection not available in DistrictTrendsSelector, using defaults");
  }
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          role="combobox" 
          className="flex items-center justify-between w-[180px] text-xs"
        >
          <span>{selectedDistrict}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {districts.map((district) => (
                <CommandItem
                  key={district}
                  value={district}
                  onSelect={() => {
                    handleDistrictChange(district);
                  }}
                  className="text-xs"
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${selectedDistrict === district ? "opacity-100" : "opacity-0"}`}
                  />
                  {district}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DistrictTrendsSelector;
