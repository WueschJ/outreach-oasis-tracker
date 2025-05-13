
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface WeekHistory {
  weekNumber: number;
  completed: number;
}

interface WeeklyNudgeTrackerProps {
  initialCurrent?: number;
  target?: number;
  initialHistory?: WeekHistory[];
}

const WeeklyNudgeTracker: React.FC<WeeklyNudgeTrackerProps> = ({
  initialCurrent = 0,
  target = 10,
  initialHistory = [
    { weekNumber: 20, completed: 8 },
    { weekNumber: 21, completed: 5 },
    { weekNumber: 22, completed: 7 },
  ],
}) => {
  const [current, setCurrent] = useState(initialCurrent);
  const [history, setHistory] = useState<WeekHistory[]>(initialHistory);
  
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  
  const getCurrentWeekNumber = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil(days / 7);
  };

  const incrementNudge = () => {
    if (current < target) {
      setCurrent(current + 1);
    }
  };

  const decrementNudge = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const resetWeek = () => {
    setHistory([...history, { weekNumber: getCurrentWeekNumber(), completed: current }]);
    setCurrent(0);
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Weekly Nudges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold">{current}<span className="text-xl text-gray-500">/{target}</span></span>
            <div>
              <Button variant="outline" size="sm" className="mr-2" onClick={decrementNudge}>-</Button>
              <Button size="sm" onClick={incrementNudge}>+</Button>
            </div>
          </div>
          <Progress value={percentage} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{percentage}% Complete</span>
            <span>Week {getCurrentWeekNumber()}</span>
          </div>
          
          {history.length > 0 && (
            <div className="mt-4">
              <h5 className="text-xs font-medium text-gray-500 mb-2">Previous Weeks</h5>
              <div className="space-y-2">
                {history.map((week, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Week {week.weekNumber}</span>
                    <div className="flex-1 mx-2">
                      <Progress value={(week.completed / target) * 100} className="h-1 opacity-50" />
                    </div>
                    <span className="text-xs text-gray-500">{week.completed}/{target}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="pt-2">
            <Button variant="outline" size="sm" onClick={resetWeek} className="w-full">
              Reset for New Week
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyNudgeTracker;
