import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useNavigate, MemoryRouter as Router} from 'react-router-dom';
import {ThemeProvider} from '@mui/material/styles';
import renderComponent from 'utils/tests/renderComponent';
import {removeToken, getToken} from 'utils/auth/cookies';
import AppHeader from 'components/organisms/AppHeader';
import {ROUTES} from 'constants/routes';
import theme from 'utils/theme';

jest.mock('utils/auth/cookies', () => ({
  getToken: jest.fn(),
  removeToken: jest.fn()
}));

describe('AppHeader', () => {
  const render = () => renderComponent(
    <ThemeProvider theme={theme}>
      <Router>
        <AppHeader />
      </Router>
    </ThemeProvider>
  );
  const navigate = jest.fn();
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMywiZXhwIjoxNjUwMTIwNjE2fQ.tbFP6NS0kg5jVW27dndofzq769lz149rMurfHZ27tRY';

  describe('without token', () => {
    it('should show sign in and sign up buttons', async () => {
      render();

      await waitFor(() => {
        expect(screen.getByTestId('sign-in')).toBeInTheDocument();
      })

      await waitFor(() => {
        expect(screen.getByTestId('sign-up')).toBeInTheDocument();
      })
    });
  });

  describe('with token', () => {
    it('should show logout button', async () => {
      getToken.mockReturnValue(token);
      render();

      await waitFor(() => {
        expect(screen.getByTestId('log-out')).toBeInTheDocument();
      })
    })
  })

  describe('when user clicks on logout button', () => {
    it('should delete token and navigate to sign in page', async () => {
      getToken.mockReturnValue(token);
      useNavigate.mockReturnValue(navigate);
      render();

      userEvent.click(screen.getByTestId('log-out'))

      await waitFor(() => {
        expect(removeToken).toBeCalledTimes(1);
      })

      await waitFor(() => {
        expect(navigate).toBeCalledTimes(1);
      });

      await waitFor(() => {
        expect(navigate).toBeCalledWith(ROUTES.SIGNIN);
      });
    })
  })
});
