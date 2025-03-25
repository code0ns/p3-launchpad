
import { ProFeature } from './ProFeature';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Plus, FileText } from 'lucide-react';
import { BadgeCustom } from '@/components/ui/badge-custom';

interface TemplateMenuProps {
  type: 'workflow' | 'checklist' | 'tool';
  onRegularAdd: () => void;
}

export function TemplateMenu({ type, onRegularAdd }: TemplateMenuProps) {
  const templates = {
    workflow: [
      'Product Launch Workflow',
      'Content Creation Pipeline',
      'Customer Onboarding Flow'
    ],
    checklist: [
      'Website Launch Checklist',
      'Product Validation Process',
      'Social Media Campaign Setup'
    ],
    tool: [
      'Starter SaaS Stack',
      'Marketing Toolkit',
      'Design Resources'
    ]
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ButtonCustom
          size="sm"
          className="h-8 px-3 py-1"
        >
          <Plus className="h-4 w-4 mr-1" /> 
          Add {type === 'workflow' ? 'Workflow' : type === 'checklist' ? 'Checklist' : 'Tool'}
        </ButtonCustom>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={onRegularAdd}>
          <Plus className="h-4 w-4 mr-2" />
          <span>Add Custom {type === 'workflow' ? 'Workflow' : type === 'checklist' ? 'Checklist' : 'Tool'}</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Templates <BadgeCustom variant="pro" className="ml-1">PRO</BadgeCustom></DropdownMenuLabel>
        
        {templates[type].map((template, index) => (
          <ProFeature 
            key={index} 
            title={template} 
            showBadge={false}
          >
            <DropdownMenuItem>
              <FileText className="h-4 w-4 mr-2" />
              <span>{template}</span>
            </DropdownMenuItem>
          </ProFeature>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
