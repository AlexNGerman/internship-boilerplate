import { Button, CircularProgress } from '@mui/material';

const SubmitButton = ({ children, loading }) => (
  <Button
    data-testid="submit"
    type="submit"
    fullWidth
    variant="contained"
    disabled={loading}
  >
    {loading ? <CircularProgress color="inherit" /> : children}
  </Button>
);

export default SubmitButton;
