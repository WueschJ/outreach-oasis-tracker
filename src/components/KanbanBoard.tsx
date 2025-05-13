
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface TeamMember {
  id: string;
  name: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description?: string;
}

interface KanbanBoardProps {
  initialMembers?: TeamMember[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
  initialMembers = [
    { id: '1', name: 'Alice Johnson', tasks: [{ id: '1', title: 'Contact new leads' }, { id: '2', title: 'Follow-up emails' }] },
    { id: '2', name: 'Bob Smith', tasks: [{ id: '3', title: 'Create pitch deck' }] },
    { id: '3', name: 'Charlie Brown', tasks: [{ id: '4', title: 'Research competitors' }] },
    { id: '4', name: 'Diana Miller', tasks: [{ id: '5', title: 'Client meeting prep' }] },
  ]
}) => {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskMemberId, setNewTaskMemberId] = useState('');
  const [editMemberName, setEditMemberName] = useState('');
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  
  const handleAddTask = () => {
    if (newTaskTitle.trim() && newTaskMemberId) {
      const updatedMembers = members.map(member => {
        if (member.id === newTaskMemberId) {
          return {
            ...member,
            tasks: [
              ...member.tasks,
              { id: Date.now().toString(), title: newTaskTitle.trim() }
            ]
          };
        }
        return member;
      });
      
      setMembers(updatedMembers);
      setNewTaskTitle('');
      setIsDialogOpen(false);
    }
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
  
  const removeTask = (memberId: string, taskId: string) => {
    const updatedMembers = members.map(member => {
      if (member.id === memberId) {
        return {
          ...member,
          tasks: member.tasks.filter(task => task.id !== taskId)
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
          setNewTaskMemberId(members[0]?.id || '');
          setIsDialogOpen(true);
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
                onClick={() => {
                  setNewTaskMemberId(member.id);
                  setIsDialogOpen(true);
                }}
              >
                +
              </Button>
            </div>
            
            {member.tasks.length > 0 ? (
              <div className="space-y-3">
                {member.tasks.map(task => (
                  <Card key={task.id} className={cn("kanban-card")}>
                    <CardContent className="p-3 flex justify-between items-center">
                      <span>{task.title}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                        onClick={() => removeTask(member.id, task.id)}
                      >
                        ×
                      </Button>
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
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="member">Team Member</Label>
              <select
                id="member"
                className="w-full p-2 border rounded"
                value={newTaskMemberId}
                onChange={(e) => setNewTaskMemberId(e.target.value)}
              >
                {members.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
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
