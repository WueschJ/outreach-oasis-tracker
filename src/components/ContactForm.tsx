
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Contact {
  id: string;
  name: string;
  notes: string;
  date: string;
}

const ContactForm: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() && notes.trim()) {
      const newContact: Contact = {
        id: Date.now().toString(),
        name: name.trim(),
        notes: notes.trim(),
        date: new Date().toISOString(),
      };
      
      setContacts([newContact, ...contacts]);
      setName('');
      setNotes('');
      
      toast({
        title: "News saved",
        description: `Notes for ${name} have been saved successfully.`,
      });
    }
  };
  
  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast({
      title: "News deleted",
      description: "News item has been removed.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>News</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Contact Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter contact name"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes
              </label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter your notes about this contact..."
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full">Save News</Button>
          </form>
        </CardContent>
      </Card>
      
      {contacts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent News</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <Card key={contact.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(contact.date).toLocaleDateString()} at {new Date(contact.date).toLocaleTimeString()}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteContact(contact.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        Delete
                      </Button>
                    </div>
                    <p className="mt-2 text-sm whitespace-pre-wrap">{contact.notes}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContactForm;
