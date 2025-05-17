
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Info, CheckCircle, ArrowRight } from 'lucide-react';

interface ActionStep {
  title: string;
  description: string;
}

interface ActionableAdviceProps {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  steps: ActionStep[];
  onActionClick?: () => void;
  actionLabel?: string;
}

const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'medium':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-blue-100 text-blue-800 border-blue-200';
  }
};

const getPriorityIcon = (priority: string): JSX.Element => {
  switch (priority) {
    case 'high':
      return <AlertCircle className="h-4 w-4" />;
    case 'medium':
      return <Info className="h-4 w-4" />;
    case 'low':
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

const ActionableAdvice: React.FC<ActionableAdviceProps> = ({
  title,
  description,
  priority,
  steps,
  onActionClick,
  actionLabel = 'Inizia Ora',
}) => {
  const priorityColor = getPriorityColor(priority);
  const PriorityIcon = getPriorityIcon(priority);
  
  return (
    <Card className="overflow-hidden border-l-4 border-l-primary shadow hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">{title}</CardTitle>
          <div className={`px-2 py-1 rounded text-xs flex items-center space-x-1 ${priorityColor}`}>
            {PriorityIcon}
            <span>Priorità {priority === 'high' ? 'Alta' : priority === 'medium' ? 'Media' : 'Bassa'}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 mt-0.5">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-sm font-medium">{step.title}</h4>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {onActionClick && (
            <Button 
              onClick={onActionClick} 
              className="w-full justify-between"
            >
              {actionLabel}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionableAdvice;
