import { Button, CircularProgress } from '@mui/material';

const SubmitButton = ({children, loading }) => (
  <Button
    data-testid="submit"
    type="submit"
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
    disabled={loading}
  >
    {loading ? <CircularProgress color="inherit" /> : children}
  </Button>
);

export default SubmitButton;