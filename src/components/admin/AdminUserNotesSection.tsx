import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { StickyNote, Plus, Trash2, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';

interface AdminUserNotesSectionProps {
  userId: string;
}

const AdminUserNotesSection = ({ userId }: AdminUserNotesSectionProps) => {
  const [notes, setNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState('');
  const [newTags, setNewTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_notes')
        .select(`
          *,
          admin:admin_id (
            id,
            email
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error: any) {
      console.error('Error fetching user notes:', error);
      toast.error('Failed to load user notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [userId]);

  const handleAddNote = async () => {
    if (!newNote.trim()) {
      toast.error('Note cannot be empty');
      return;
    }

    try {
      setSubmitting(true);
      const tagsArray = newTags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('user_notes')
        .insert([{
          user_id: userId,
          admin_id: user?.id,
          note: newNote,
          tags: tagsArray
        }]);

      if (error) throw error;

      toast.success('Note added successfully');
      setNewNote('');
      setNewTags('');
      fetchNotes();
    } catch (error: any) {
      console.error('Error adding note:', error);
      toast.error('Failed to add note');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      const { error } = await supabase
        .from('user_notes')
        .delete()
        .eq('id', noteId);

      if (error) throw error;

      toast.success('Note deleted');
      fetchNotes();
    } catch (error: any) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StickyNote className="h-5 w-5" />
          Admin Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Note */}
        <div className="space-y-3">
          <Textarea
            placeholder="Add a note about this user..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={3}
          />
          <Input
            placeholder="Tags (comma separated, e.g., verified, high-risk, vip)"
            value={newTags}
            onChange={(e) => setNewTags(e.target.value)}
          />
          <Button onClick={handleAddNote} disabled={submitting} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Note
          </Button>
        </div>

        <Separator />

        {/* Notes List */}
        <div className="space-y-3">
          {loading ? (
            <p className="text-sm text-muted-foreground text-center py-4">Loading notes...</p>
          ) : notes.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No notes yet</p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="p-4 bg-muted/50 rounded-lg space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm flex-1">{note.note}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteNote(note.id)}
                    className="h-8 w-8 shrink-0"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                
                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map((tag: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(note.created_at), 'MMM d, yyyy h:mm a')}
                  </span>
                  {note.admin && (
                    <span>By: {note.admin.email}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUserNotesSection;