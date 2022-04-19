import {render} from '@testing-library/react';
import {createClient, Provider} from 'urql';
import {API_URL} from 'constants/api';

const client = createClient({url: API_URL, requestPolicy: 'network-only'});

const renderComponent = (ui) => {
  const Wrapper = ({children}) => (
    <Provider value={client}>
      {children}
    </Provider>
  );

  return render(ui, {wrapper: Wrapper});
};


export default renderComponent;
