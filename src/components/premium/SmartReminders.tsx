
import { Switch } from '@/components/ui/switch';
import { ProFeature } from './ProFeature';
import { Card } from '@/components/ui/card-custom';
import { BadgeCustom } from '@/components/ui/badge-custom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function SmartReminders() {
  return (
    <ProFeature 
      title="Smart Reminders" 
      description="Get intelligent nudges to help you stay on track with your goals"
      showBadge={false}
    >
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">Smart Reminders</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full cursor-help">?</span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-sm">Get smart nudges to stay on track with your goals and business activities</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-1">
          <Switch id="smart-reminders" disabled />
          <BadgeCustom variant="pro" className="ml-2">PRO</BadgeCustom>
        </div>
      </div>
    </ProFeature>
  );
}
