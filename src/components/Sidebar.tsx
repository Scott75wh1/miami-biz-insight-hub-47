
import React from 'react';
import { 
  ChartBar, 
  Users, 
  Search, 
  Database, 
  Building, 
  MessageSquare,
  Map as MapIcon,
  ChevronLeft,
  ChevronRight,
  Car
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={cn(
      "flex flex-col h-screen bg-sidebar border-r transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="p-4 flex justify-between items-center">
        {!collapsed && (
          <span className="font-semibold text-lg">Dashboard</span>
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
          icon={MapIcon} 
          label="Mappa di Miami" 
          collapsed={collapsed} 
          active={location.pathname === '/'} 
          onClick={() => navigate('/')}
        />
        <SidebarItem 
          icon={Users} 
          label="Demografia" 
          collapsed={collapsed}
          active={location.pathname === '/census'} 
          onClick={() => navigate('/census')}
        />
        <SidebarItem 
          icon={Car} 
          label="Analisi Traffico" 
          collapsed={collapsed}
          active={location.pathname === '/traffic'} 
          onClick={() => navigate('/traffic')}
        />
        <SidebarItem icon={ChartBar} label="Trend di Mercato" collapsed={collapsed} />
        <SidebarItem icon={Building} label="Analisi Competitor" collapsed={collapsed} />
        <SidebarItem icon={Search} label="Ricerca Avanzata" collapsed={collapsed} />
        <SidebarItem icon={Database} label="Dataset" collapsed={collapsed} />
        <SidebarItem icon={MessageSquare} label="Assistente AI" collapsed={collapsed} />
      </nav>
      
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
