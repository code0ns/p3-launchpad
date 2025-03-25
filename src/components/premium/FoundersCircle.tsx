
import { ProFeature } from './ProFeature';
import { Card, CardTitle, CardContent } from '@/components/ui/card-custom';
import { Users } from 'lucide-react';

export function FoundersCircle() {
  return (
    <ProFeature title="Founders Circle" description="Connect with other founders building in your space">
      <Card>
        <CardContent className="pt-4 text-center py-8">
          <div className="mx-auto bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Users className="h-8 w-8" />
          </div>
          <CardTitle className="mb-2">Join the Founders Circle</CardTitle>
          <p className="text-muted-foreground mb-4">
            Connect with other founders like you. Share insights, get feedback, and grow together.
          </p>
          <div className="text-sm">
            <p>✓ Weekly group calls</p>
            <p>✓ Private Discord community</p>
            <p>✓ Accountability partnerships</p>
          </div>
        </CardContent>
      </Card>
    </ProFeature>
  );
}
