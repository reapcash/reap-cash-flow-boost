import { useState, useEffect } from 'react';
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

  // Update draft name when dialog opens with new default
  useEffect(() => {
    if (open) {
      setDraftName(defaultName);
    }
  }, [open, defaultName]);

  const handleSave = () => {
    onSave(draftName || 'Untitled Draft');
  };

  const handleDiscard = () => {
    onDiscard();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md mx-4">
        <AlertDialogHeader>
          <AlertDialogTitle>Save Draft</AlertDialogTitle>
          <AlertDialogDescription className="text-sm">
            Give your draft a name so you can easily find it later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-2 py-4">
          <Label htmlFor="draft-name" className="text-sm font-medium">
            Draft Name
          </Label>
          <Input
            id="draft-name"
            placeholder="e.g., Main Street Property Application"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSave();
              }
            }}
            className="w-full"
            maxLength={100}
          />
        </div>

        <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleDiscard}
            className="w-full sm:w-auto"
          >
            Discard
          </Button>
          <AlertDialogCancel className="w-full sm:w-auto mt-0">
            Continue Editing
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleSave} 
            className="w-full sm:w-auto"
          >
            Save Draft
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
