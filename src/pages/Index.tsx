
import React from 'react';
import Header from '@/components/Header';
import KpiTracker from '@/components/KpiTracker';
import WeeklyNudgeTracker from '@/components/WeeklyNudgeTracker';
import KanbanBoard from '@/components/KanbanBoard';
import ContactForm from '@/components/ContactForm';
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const endOfJuly2025 = "2025-07-31";
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Toaster />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <KpiTracker current={12} target={30} endDate={endOfJuly2025} />
          <WeeklyNudgeTracker initialCurrent={3} target={10} />
        </div>
        
        <div className="mb-8">
          <KanbanBoard />
        </div>
        
        <div>
          <ContactForm />
        </div>
      </main>
    </div>
  );
};

export default Index;
