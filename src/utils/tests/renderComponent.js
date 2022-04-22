import {render} from '@testing-library/react';
import {createClient, Provider} from 'urql';
import {MemoryRouter as Router} from 'react-router-dom';
import {ThemeProvider} from '@mui/material/styles';
import {API_URL} from 'constants/api';
import theme from '../theme';

const client = createClient({url: API_URL, requestPolicy: 'network-only'});

const renderComponent = (ui) => {
  const Wrapper = ({children}) => (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <Router>
          {children}
        </Router>
      </ThemeProvider>
    </Provider>
  );

  return render(ui, {wrapper: Wrapper});
};


export default renderComponent;
