import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    white: {
      main: '#fff'
    }
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'unbordered' },
          style: {
            textTransform: 'none',
            border: 'none',
            padding: '6px',
          },
        },
      ],
    }
  }
});
export default theme;
