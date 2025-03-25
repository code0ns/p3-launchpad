
import { Download } from 'lucide-react';
import { ProFeature } from './ProFeature';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function ExportButton() {
  return (
    <ProFeature 
      title="Export Dashboard" 
      description="Export your dashboard data to PDF or Notion for easy sharing and backup"
      showBadge={false}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <ButtonCustom
                size="sm"
                variant="outline"
                className="h-8"
              >
                <Download className="h-3.5 w-3.5 mr-1" /> 
                Export
              </ButtonCustom>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Export to PDF or Notion (Pro)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ProFeature>
  );
}
