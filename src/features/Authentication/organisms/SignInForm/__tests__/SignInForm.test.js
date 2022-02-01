import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderComponent from 'utils/tests/renderComponent';
import { useNavigate } from 'react-router-dom';

import SignInForm from 'features/Authentication/organisms/SignInForm';
import { server, signInError } from 'utils/tests';
import { ROUTES } from 'constants/routes';

describe('SignIn', () => {
  const render = () => renderComponent(<SignInForm />);
  const navigate = jest.fn();

  describe('with valid data', () => {
    it('calls navigate() with correct params', async () => {
      useNavigate.mockReturnValue(navigate);
      render();

      userEvent.type(screen.getByTestId('email'), 'john.dee@someemail.com')
      userEvent.type(screen.getByTestId('password'), 'Alex_12345')
      userEvent.click(screen.getByTestId('submit'))

      await waitFor(() => {
        expect(navigate).toBeCalledTimes(1);
        expect(navigate).toBeCalledWith(ROUTES.HOME);
      });
    });
  })

  describe('with invalid data', () => {
    describe('with empty fields' , () => {
      it('renders correct errors', async () => {
        render();

        userEvent.type(screen.getByTestId('email'), '')
        userEvent.type(screen.getByTestId('password'), '')
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText('Please enter your email')).toBeInTheDocument()
        });
        await waitFor(() => {
          expect(screen.getByText('Please enter your password')).toBeInTheDocument()
        });
      });
    })

    describe('with invalid email' , () => {
      it('renders correct errors', async () => {
        render();

        userEvent.type(screen.getByTestId('email'), 'email')
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText('Invalid email')).toBeInTheDocument()
        });
      });
    })

    describe('with invalid password' , () => {
      it('renders correct errors', async () => {
        render();

        userEvent.type(screen.getByTestId('password'), 'password')
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText(`Password must contain at least 10 characters, one uppercase, one number and one special case character`)).toBeInTheDocument()
        });
      });
    })

    describe('with failed request', () => {
      it('renders server error', async () => {
        server.use(signInError);

        render();

        userEvent.type(screen.getByTestId('email'), 'john.dee@someemail.com')
        userEvent.type(screen.getByTestId('password'), 'Alex_12345')
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText('[GraphQL] Wrong email or password')).toBeInTheDocument()
        });
      });
    })
  })
})
