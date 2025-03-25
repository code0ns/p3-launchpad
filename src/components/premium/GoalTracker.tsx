
import { useState } from 'react';
import { ProFeature } from './ProFeature';
import { Card, CardTitle, CardContent } from '@/components/ui/card-custom';
import { Input } from '@/components/ui/input';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Plus, Save } from 'lucide-react';

interface Goal {
  id: number;
  title: string;
  deadline: string;
  completed: boolean;
}

export function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>([
    { 
      id: 1, 
      title: "Launch MVP to first 10 users", 
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString().split('T')[0], 
      completed: false 
    }
  ]);
  
  const [editing, setEditing] = useState<number | null>(null);
  const [tempGoal, setTempGoal] = useState<Partial<Goal>>({});
  
  const toggleGoalCompleted = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };
  
  return (
    <ProFeature title="Goal Tracker" description="Set and track your business goals with deadlines">
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-xl font-semibold">🎯 Goals</h3>
          <ButtonCustom size="sm" className="h-8 px-3 py-1">
            <Plus className="h-4 w-4 mr-1" /> Add Goal
          </ButtonCustom>
        </div>
        
        <div className="space-y-4">
          {goals.map(goal => (
            <Card key={goal.id}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    checked={goal.completed}
                    onChange={() => toggleGoalCompleted(goal.id)}
                    className="mt-1 rounded-full h-5 w-5 border-gray-300 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className={`font-medium ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {goal.title}
                    </div>
                    {goal.deadline && (
                      <div className="text-sm text-muted-foreground mt-1">
                        Deadline: {new Date(goal.deadline).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {goals.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No goals set yet. Click "Add Goal" to get started.
            </div>
          )}
        </div>
      </div>
    </ProFeature>
  );
}
