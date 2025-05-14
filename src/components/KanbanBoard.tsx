
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Strikethrough } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface KanbanBoardProps {
  initialMembers?: TeamMember[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
  initialMembers = [
    { 
      id: '1', 
      name: 'Alice Johnson', 
      tasks: [
        { id: '1', title: 'Contact new leads', completed: false }, 
        { id: '2', title: 'Follow-up emails', completed: false }
      ] 
    },
    { 
      id: '2', 
      name: 'Bob Smith', 
      tasks: [
        { id: '3', title: 'Create pitch deck', completed: false }
      ] 
    },
    { 
      id: '3', 
      name: 'Charlie Brown', 
      tasks: [
        { id: '4', title: 'Research competitors', completed: false }
      ] 
    },
    { 
      id: '4', 
      name: 'Diana Miller', 
      tasks: [
        { id: '5', title: 'Client meeting prep', completed: false }
      ] 
    },
  ]
}) => {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [currentMemberId, setCurrentMemberId] = useState<string | null>(null);
  const [editMemberName, setEditMemberName] = useState('');
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  
  const handleAddTask = () => {
    if (newTaskTitle.trim() && currentMemberId) {
      const updatedMembers = members.map(member => {
        if (member.id === currentMemberId) {
          return {
            ...member,
            tasks: [
              ...member.tasks,
              { id: Date.now().toString(), title: newTaskTitle.trim(), completed: false }
            ]
          };
        }
        return member;
      });
      
      setMembers(updatedMembers);
      setNewTaskTitle('');
      setIsTaskDialogOpen(false);
    }
  };
  
  const openAddTaskDialog = (memberId: string) => {
    setCurrentMemberId(memberId);
    setNewTaskTitle('');
    setIsTaskDialogOpen(true);
  };
  
  const handleEditMember = () => {
    if (editMemberName.trim() && editingMember) {
      const updatedMembers = members.map(member => {
        if (member.id === editingMember.id) {
          return {
            ...member,
            name: editMemberName.trim()
          };
        }
        return member;
      });
      
      setMembers(updatedMembers);
      setEditMemberName('');
      setEditingMember(null);
      setIsMemberDialogOpen(false);
    }
  };
  
  const openMemberDialog = (member: TeamMember) => {
    setEditingMember(member);
    setEditMemberName(member.name);
    setIsMemberDialogOpen(true);
  };
  
  const toggleTaskCompletion = (memberId: string, taskId: string) => {
    const updatedMembers = members.map(member => {
      if (member.id === memberId) {
        return {
          ...member,
          tasks: member.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                completed: !task.completed
              };
            }
            return task;
          })
        };
      }
      return member;
    });
    
    setMembers(updatedMembers);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Team Tasks</h2>
        <Button onClick={() => {
          setCurrentMemberId(members[0]?.id || '');
          setIsTaskDialogOpen(true);
        }}>
          Add Task
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {members.map(member => (
          <div key={member.id} className="kanban-column">
            <div className="flex justify-between items-center mb-4">
              <h3 
                className="font-medium text-gray-700 cursor-pointer hover:text-primary transition-colors"
                onClick={() => openMemberDialog(member)}
              >
                {member.name}
              </h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => openAddTaskDialog(member.id)}
              >
                +
              </Button>
            </div>
            
            {member.tasks.length > 0 ? (
              <div className="space-y-3">
                {member.tasks.map(task => (
                  <Card 
                    key={task.id} 
                    className={cn(
                      "kanban-card cursor-pointer transition-all",
                      task.completed && "bg-gray-100"
                    )}
                    onClick={() => toggleTaskCompletion(member.id, task.id)}
                  >
                    <CardContent className="p-3 flex justify-between items-center">
                      <span className={cn(
                        task.completed && "text-gray-400 line-through"
                      )}>
                        {task.title}
                      </span>
                      {task.completed && (
                        <Strikethrough className="h-4 w-4 text-gray-400" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400 text-sm">
                No tasks yet
              </div>
            )}
          </div>
        ))}
      </div>
      
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {members.find(m => m.id === currentMemberId)?.name 
                ? `Add Task for ${members.find(m => m.id === currentMemberId)?.name}` 
                : 'Add New Task'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="task">Task Title</Label>
              <Input
                id="task"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isMemberDialogOpen} onOpenChange={setIsMemberDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="memberName">Name</Label>
              <Input
                id="memberName"
                value={editMemberName}
                onChange={(e) => setEditMemberName(e.target.value)}
                placeholder="Enter member name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMemberDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditMember}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KanbanBoard;
