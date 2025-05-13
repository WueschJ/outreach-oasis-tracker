
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import FavourList, { Favour } from './FavourList';

interface KpiTrackerProps {
  current: number;
  target: number;
  endDate: string;
}

const KpiTracker: React.FC<KpiTrackerProps> = ({ current: initialCurrent, target, endDate }) => {
  const [current, setCurrent] = useState(initialCurrent);
  const [recipientName, setRecipientName] = useState('');
  const [favours, setFavours] = useState<Favour[]>([]);
  
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  const today = new Date();
  const targetDate = new Date(endDate);
  const daysLeft = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const handleAddFavour = () => {
    if (recipientName.trim()) {
      const newFavour: Favour = {
        id: Date.now().toString(),
        recipientName: recipientName.trim(),
        date: new Date().toISOString()
      };
      
      setCurrent(prev => prev + 1);
      setFavours(prev => [newFavour, ...prev]);
      setRecipientName('');
      toast.success(`Favour granted to ${recipientName.trim()}`);
    } else {
      toast.error("Please enter a recipient name");
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Favours Granted</CardTitle>
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
            <span>Target: {target} Favours</span>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Input 
              placeholder="Recipient name" 
              value={recipientName} 
              onChange={e => setRecipientName(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddFavour}>Grant Favour</Button>
          </div>
        </div>
        
        <FavourList favours={favours} />
      </CardContent>
    </Card>
  );
};

export default KpiTracker;
