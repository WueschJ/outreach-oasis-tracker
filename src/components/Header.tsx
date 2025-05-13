
import React from 'react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900">Project Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">Settings</Button>
          <Button>Export</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
