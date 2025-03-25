
import { useState } from 'react';
import { BadgeCustom } from '@/components/ui/badge-custom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ButtonCustom } from '@/components/ui/button-custom';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LockIcon } from 'lucide-react';

interface ProFeatureProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  showBadge?: boolean;
  isCard?: boolean;
}

export function ProFeature({ 
  children, 
  title, 
  description, 
  className,
  showBadge = true,
  isCard = false
}: ProFeatureProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Simulating subscription status - in a real app this would come from auth
  const isSubscribed = false;
  
  const handleClick = () => {
    if (!isSubscribed) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div 
        onClick={handleClick}
        className={cn(
          "relative group",
          !isSubscribed && "cursor-pointer",
          isCard && "border rounded-2xl p-6",
          isCard && !isSubscribed && "border-gray-200 hover:border-white hover:shadow-glow transition-all duration-300",
          className
        )}
      >
        {showBadge && (
          <div className="absolute top-2 right-2 z-10">
            <BadgeCustom variant="pro">PRO</BadgeCustom>
          </div>
        )}
        
        {!isSubscribed && (
          <div className="absolute inset-0 bg-white/5 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
              <LockIcon className="h-4 w-4" />
            </div>
          </div>
        )}
        
        {children}
      </div>
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>This is a P3 Pro feature</DialogTitle>
            <DialogDescription>
              Get access to premium tools, smart reminders, and more.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-2">
              {description || `Upgrade to Pro to unlock ${title} and all other premium features.`}
            </p>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <ButtonCustom 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Maybe later
            </ButtonCustom>
            <ButtonCustom 
              onClick={() => {
                setIsModalOpen(false);
                navigate('/pricing');
              }}
              className="w-full sm:w-auto"
            >
              Upgrade to Pro
            </ButtonCustom>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
