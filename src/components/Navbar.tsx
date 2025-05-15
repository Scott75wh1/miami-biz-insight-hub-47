
import React from 'react';
import { Link } from 'react-router-dom';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useUserType } from '@/hooks/useUserType';
import { Building, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserTypeSelector from './UserTypeSelector';

const Navbar: React.FC = () => {
  const { districts, selectedDistrict, handleDistrictChange } = useDistrictSelection();
  const { userType } = useUserType();

  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            <span className="font-medium text-lg">Miami Insights</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/dashboard" className="text-sm hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/my-business" className="text-sm hover:text-primary transition-colors">
              La Mia Attività
            </Link>
            {userType === 'marketer' && (
              <>
                <Link to="/data-explorer" className="text-sm hover:text-primary transition-colors">
                  Esplora Dati
                </Link>
                <Link to="/competitor-analysis" className="text-sm hover:text-primary transition-colors">
                  Analisi Competitor
                </Link>
              </>
            )}
            <Link to="/ai-assistant" className="text-sm hover:text-primary transition-colors">
              Assistente AI
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:block w-48">
            <UserTypeSelector 
              selectedType={userType} 
              onTypeChange={(type) => {}} // handled by provider
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <span>{selectedDistrict}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {districts.map((district) => (
                <DropdownMenuItem
                  key={district}
                  className={selectedDistrict === district ? "bg-accent" : ""}
                  onClick={() => handleDistrictChange(district)}
                >
                  {district}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/census" className="w-full">
                  Visualizza tutti i distretti
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
