
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';

export interface Favour {
  id: string;
  recipientName: string;
  date: string;
}

interface FavourListProps {
  favours: Favour[];
}

const FavourList: React.FC<FavourListProps> = ({ favours }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (favours.length === 0) {
    return null;
  }
  
  // Sort favours by date, newest first
  const sortedFavours = [...favours].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Show only the last 3 favours when collapsed
  const displayFavours = isExpanded ? sortedFavours : sortedFavours.slice(0, 3);
  const hasMore = sortedFavours.length > 3;
  
  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-500">Recent Favours Granted</h4>
        {hasMore && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 px-2 text-xs flex items-center"
          >
            {isExpanded ? (
              <>
                <span>Show less</span>
                <ArrowUp className="ml-1 h-3 w-3" />
              </>
            ) : (
              <>
                <span>Show all ({sortedFavours.length})</span>
                <ArrowDown className="ml-1 h-3 w-3" />
              </>
            )}
          </Button>
        )}
      </div>
      
      <div className="space-y-2">
        {displayFavours.map((favour) => (
          <Card key={favour.id} className="bg-gray-50">
            <CardContent className="py-2 px-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">{favour.recipientName}</span>
                <span className="text-gray-500 text-xs">
                  {new Date(favour.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FavourList;
