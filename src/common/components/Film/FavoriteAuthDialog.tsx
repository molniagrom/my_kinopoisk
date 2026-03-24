import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

type FavoriteAuthDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const FavoriteAuthDialog = ({ open, onClose }: FavoriteAuthDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Need an account</DialogTitle>
      <DialogContent>Add movies to favorites only after signing in to your TMDB account.</DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FavoriteAuthDialog;
