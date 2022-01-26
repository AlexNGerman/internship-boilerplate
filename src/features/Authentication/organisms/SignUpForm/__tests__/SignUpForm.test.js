import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderComponent from 'utils/tests/renderComponent';
import { useNavigate } from 'react-router-dom';

import SignUpForm from 'features/Authentication/organisms/SignUpForm';
import { server, signUpError } from 'utils/tests';
import { ROUTES } from 'constants/routes';

describe('SignUp Formik form', () => {

  const render = () => renderComponent(<SignUpForm />);

  const navigate = jest.fn();

  describe('with valid data', () => {
    it('calls navigate with correct params', async () => {
      useNavigate.mockReturnValue(navigate);
      render();

      userEvent.type(screen.getByTestId('firstName'), 'John')
      userEvent.type(screen.getByTestId('lastName'), 'Dee')
      userEvent.type(screen.getByTestId('email'), 'john.dee@someemail.com')
      userEvent.type(screen.getByTestId('password'), 'Alex_12345')
      userEvent.click(screen.getByTestId('submit'))

      await waitFor(() => {
        expect(navigate).toBeCalledTimes(1);
        expect(navigate).toBeCalledWith(ROUTES.SIGNIN);
      });
    });
  })

  describe('with invalid data', () => {
    describe('with empty fields' , () => {
      it('render correct errors', async () => {
        render();

        userEvent.type(screen.getByTestId('firstName'), '')
        userEvent.type(screen.getByTestId('lastName'), '')
        userEvent.type(screen.getByTestId('email'), '')
        userEvent.type(screen.getByTestId('password'), '')
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText('Please enter your first name')).toBeInTheDocument()
        });
        await waitFor(() => {
          expect(screen.getByText('Please enter your last name')).toBeInTheDocument()
        });
        await waitFor(() => {
          expect(screen.getByText('Please enter your email')).toBeInTheDocument()
        });
        await waitFor(() => {
          expect(screen.getByText('Please enter your password')).toBeInTheDocument()
        });
      });
    })

    describe('with invalid email' , () => {
      it('render correct errors', async () => {
        render();

        userEvent.type(screen.getByTestId('email'), 'email')
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText('Invalid email')).toBeInTheDocument()
        });
      });
    })

    describe('with invalid password' , () => {
      it('render correct errors', async () => {
        render();

        userEvent.type(screen.getByTestId('password'), 'password')
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText(`Password must contain at least 10 characters, one uppercase, one number and one special case character`)).toBeInTheDocument()
        });
      });
    })

    describe('with too short first name and last name' , () => {
      it('render correct errors', async () => {
        render();

        userEvent.type(screen.getByTestId('firstName'), 'd')
        userEvent.type(screen.getByTestId('lastName'), 'd')
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText(`First name can't be less than 2 characters`)).toBeInTheDocument()
        });
        await waitFor(() => {
          expect(screen.getByText(`Last name can't be less than 2 characters`)).toBeInTheDocument()
        });
      });
    })

    describe('with too long first name and last name' , () => {
      it('render correct errors', async () => {
        render();

        userEvent.type(screen.getByTestId('firstName'), 'firstNamefirstNamefirstNamefirstNamefirstNamefirstName')
        userEvent.type(screen.getByTestId('lastName'), 'lastNamelastNamelastNamelastNamelastNamelastNamelastName')
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText(`First name can't be longer than 50 characters`)).toBeInTheDocument()
        });
        await waitFor(() => {
          expect(screen.getByText(`Last name can't be longer than 50 characters`)).toBeInTheDocument()
        });
      });
    })

    describe('with failed request', () => {
      it('render server error', async () => {
        server.use(signUpError);

        render();

        userEvent.type(screen.getByTestId('firstName'), 'John')
        userEvent.type(screen.getByTestId('lastName'), 'Dee')
        userEvent.type(screen.getByTestId('email'), 'john.dee@someemail.com')
        userEvent.type(screen.getByTestId('password'), 'Alex_12345')
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText('[GraphQL] Email has already been taken')).toBeInTheDocument()
        });
      });
    })
  })
})
