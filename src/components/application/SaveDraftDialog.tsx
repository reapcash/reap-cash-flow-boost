import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface SaveDraftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (draftName: string) => void;
  onDiscard: () => void;
  defaultName?: string;
}

export const SaveDraftDialog = ({
  open,
  onOpenChange,
  onSave,
  onDiscard,
  defaultName = '',
}: SaveDraftDialogProps) => {
  const [draftName, setDraftName] = useState(defaultName);

  const handleSave = () => {
    onSave(draftName || 'Untitled Draft');
    onOpenChange(false);
  };

  const handleDiscard = () => {
    onDiscard();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Save Draft</AlertDialogTitle>
          <AlertDialogDescription>
            Give your draft a name so you can easily find it later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-2 py-4">
          <Label htmlFor="draft-name">Draft Name</Label>
          <Input
            id="draft-name"
            placeholder="e.g., Main Street Property Application"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSave();
              }
            }}
          />
        </div>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleDiscard}
            className="sm:order-1"
          >
            Discard Draft
          </Button>
          <AlertDialogCancel className="sm:order-2 mt-0">
            Continue Editing
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleSave} className="sm:order-3">
            Save Draft
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
