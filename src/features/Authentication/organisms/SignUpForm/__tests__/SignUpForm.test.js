import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpForm from 'features/Authentication/organisms/SignUpForm';
import { SIGNUP_FIELDS } from 'constants/formTest.constants';


describe('SignUp Formik form', () => {
  const dispatch = jest.fn();
  const renderCOmponent = () => render(<SignUpForm />);

  describe('with valid data', () => {
    it('dispatch SignUp() with correct params', async () => {
      renderCOmponent();

      //{"data":{"createUser":{"id":"48","__typename":"User"}}}
      userEvent.type(screen.getByTestId('firstName'), SIGNUP_FIELDS.FIRST_NAME)
      userEvent.type(screen.getByTestId('lastName'), SIGNUP_FIELDS.LAST_NAME)
      userEvent.type(screen.getByTestId('email'), SIGNUP_FIELDS.EMAIL)
      userEvent.type(screen.getByTestId('password'), SIGNUP_FIELDS.PASSWORD)
      userEvent.click(screen.getByTestId('submit'))

      await waitFor(() => {
        expect(dispatch).toHaveBeenCalledWith({
          firstName: SIGNUP_FIELDS.FIRST_NAME,
          lastName: SIGNUP_FIELDS.LAST_NAME,
          email: SIGNUP_FIELDS.EMAIL,
          password: SIGNUP_FIELDS.PASSWORD,
        })
      });
    });
  })
})
