
import React, { useState } from 'react';
import { Search, Building, Home, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SettingsDialog } from './SettingsDialog';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Utilizzo sicuro del context
  let districts = ["Miami Beach", "Wynwood", "Brickell", "Little Havana", "Downtown"];
  let selectedDistrict = "Miami Beach";
  let handleDistrictChange = (district: string) => {
    console.log(`District changed to: ${district}`);
    // Creare un evento personalizzato per notificare il cambio di distretto
    const event = new CustomEvent('districtChanged', { detail: { district } });
    window.dispatchEvent(event);
  };
  
  try {
    const districtContext = useDistrictSelection();
    if (districtContext) {
      districts = districtContext.districts;
      selectedDistrict = districtContext.selectedDistrict;
      handleDistrictChange = districtContext.handleDistrictChange;
    }
  } catch (error) {
    console.warn("District selection context not available in Navbar, using defaults");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Building className="h-6 w-6 text-miami-blue" />
          <span className="text-lg font-bold">Miami Business Insight Hub</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
            <Select value={selectedDistrict} onValueChange={handleDistrictChange}>
              <SelectTrigger className="w-[140px] h-9 text-sm">
                <SelectValue placeholder="Seleziona zona" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="hidden md:flex md:w-60 lg:w-72">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cerca quartiere o settore..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <SettingsDialog />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
