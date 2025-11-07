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
import { Button } from '@/components/ui/button';

interface LeaveConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveDraft: () => void;
  onDiscard: () => void;
}

export const LeaveConfirmationDialog = ({
  open,
  onOpenChange,
  onSaveDraft,
  onDiscard,
}: LeaveConfirmationDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
          <AlertDialogDescription className="text-sm">
            You have unsaved changes. Would you like to save your progress before leaving?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onDiscard}
            className="w-full sm:w-auto"
          >
            Discard Changes
          </Button>
          <AlertDialogCancel className="w-full sm:w-auto mt-0">
            Continue Editing
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onSaveDraft} 
            className="w-full sm:w-auto"
          >
            Save Draft
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
