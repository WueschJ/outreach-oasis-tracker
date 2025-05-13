
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface KpiTrackerProps {
  current: number;
  target: number;
  endDate: string;
}

const KpiTracker: React.FC<KpiTrackerProps> = ({ current, target, endDate }) => {
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  const today = new Date();
  const targetDate = new Date(endDate);
  const daysLeft = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Outreach Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold">{current}<span className="text-xl text-gray-500">/{target}</span></span>
            <span className="text-sm text-gray-500">{daysLeft} days left until {new Date(endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
          <Progress value={percentage} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{percentage}% Complete</span>
            <span>Target: {target} Outreaches</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiTracker;
