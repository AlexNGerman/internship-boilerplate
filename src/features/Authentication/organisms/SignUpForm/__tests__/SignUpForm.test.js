import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpForm from 'features/Authentication/organisms/SignUpForm';

describe('SignUp Formik form', () => {
  const dispatch = jest.fn();
  const renderComponent = () => render(<SignUpForm />);

  describe('with valid data', () => {
    it('dispatch SignUp() with correct params', async () => {
      renderComponent();

      //{"data":{"createUser":{"id":"48","__typename":"User"}}}
      userEvent.type(screen.getByTestId('firstName'), 'John')
      userEvent.type(screen.getByTestId('lastName'), 'Dee')
      userEvent.type(screen.getByTestId('email'), 'john.dee@someemail.com')
      userEvent.type(screen.getByTestId('password'), 'Alex_12345')
      userEvent.click(screen.getByTestId('submit'))

      await waitFor(() => {
        expect(dispatch).toHaveBeenCalledWith({
          firstName: 'John',
          lastName: 'Dee',
          email: 'john.dee@someemail.com',
          password: 'Alex_12345',
        })
      });
    });
  })
})
