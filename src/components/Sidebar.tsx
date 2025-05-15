
import React from 'react';
import { 
  ChartBar, 
  Users, 
  Database, 
  Building, 
  MessageSquare,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Search,
  BarChart4,
  Settings,
  RefreshCcw,
  Home,
  Map
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDataCollection } from '@/hooks/useDataCollection';
import { useToast } from '@/hooks/use-toast';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshAllData, isLoading } = useDataCollection();
  const { toast } = useToast();

  const handleRefreshAllData = (e: React.MouseEvent) => {
    e.preventDefault();
    refreshAllData();
    toast({
      title: "Aggiornamento dati",
      description: "Stiamo aggiornando tutti i dati disponibili...",
    });
  };

  const isHomePage = location.pathname === '/';
  const currentPath = location.pathname;

  return (
    <aside className={cn(
      "flex flex-col h-screen bg-sidebar border-r transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="p-4 flex justify-between items-center">
        {!collapsed && (
          <span className="font-semibold text-lg">Miami Insights</span>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <nav className="flex-1 p-2 space-y-1">
        <SidebarItem 
          icon={Home} 
          label="Home" 
          collapsed={collapsed} 
          active={currentPath === '/'} 
          onClick={() => navigate('/')}
        />

        <SidebarItem 
          icon={MessageSquare} 
          label="Assistente AI" 
          collapsed={collapsed}
          active={currentPath === '/ai-assistant'} 
          onClick={() => navigate('/ai-assistant')}
        />

        <SidebarItem 
          icon={Building} 
          label="La mia Attività" 
          collapsed={collapsed} 
          active={currentPath === '/my-business'} 
          onClick={() => navigate('/my-business')}
        />

        <SidebarItem 
          icon={Database} 
          label="Dati del Censimento" 
          collapsed={collapsed}
          active={currentPath.startsWith('/census')} 
          onClick={() => navigate('/census')}
        />
        
        <SidebarItem 
          icon={Search} 
          label="Esplora Dati" 
          collapsed={collapsed} 
          active={currentPath === '/data-explorer'} 
          onClick={() => navigate('/data-explorer')}
        />
        
        <SidebarItem 
          icon={ChartBar} 
          label="Trend di Mercato" 
          collapsed={collapsed}
          active={currentPath === '/market-trends'} 
          onClick={() => navigate('/market-trends')}
        />
        
        <SidebarItem 
          icon={BarChart4} 
          label="Analisi Competitiva" 
          collapsed={collapsed}
          active={currentPath === '/competitor-analysis'} 
          onClick={() => navigate('/competitor-analysis')}
        />
        
        <SidebarItem 
          icon={Map} 
          label="Traffico" 
          collapsed={collapsed}
          active={currentPath === '/traffic'} 
          onClick={() => navigate('/traffic')}
        />
      </nav>
      
      <div className="p-2 mt-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "w-full justify-start",
            isLoading && "animate-pulse"
          )}
          onClick={handleRefreshAllData}
          disabled={isLoading}
        >
          <RefreshCcw className={cn(
            "h-5 w-5 mr-2",
            isLoading && "animate-spin"
          )} />
          {!collapsed && <span>{isLoading ? "Aggiornamento..." : "Aggiorna Dati"}</span>}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "w-full justify-start mt-1",
            collapsed ? "px-2" : "px-3",
            currentPath === '/settings' && "bg-accent"
          )}
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-5 w-5 mr-2" />
          {!collapsed && <span>Impostazioni</span>}
        </Button>
      </div>
      
      <div className="p-4 border-t">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            Ultimo aggiornamento: Maggio 2025
          </div>
        )}
      </div>
    </aside>
  );
};

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, collapsed, active, onClick }: SidebarItemProps) => {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start",
        collapsed ? "px-2" : "px-3"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-5 w-5", active ? "" : "text-muted-foreground")} />
      {!collapsed && <span className="ml-2">{label}</span>}
    </Button>
  );
};

export default Sidebar;
