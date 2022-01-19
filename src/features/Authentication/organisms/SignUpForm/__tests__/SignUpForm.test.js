import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Provider } from 'urql';
import { never } from 'wonka';
import SignUpForm from 'features/Authentication/organisms/SignUpForm';
import { SIGNUP_FIELDS } from 'constants/formTest.constants';


describe('SignUp Formik form tests', () => {
  it('Success test', async () => {
    const onSubmit = jest.fn();
    const testValues = {
      firstName: SIGNUP_FIELDS.FIRST_NAME,
      lastName: SIGNUP_FIELDS.LAST_NAME,
      email: SIGNUP_FIELDS.EMAIL,
      password: SIGNUP_FIELDS.PASSWORD,
    };

    //{"data":{"createUser":{"id":"48","__typename":"User"}}} 
    const mockClient = {
      createUser: jest.fn(() => never),
    };

    act(() => {
      render(
        <Provider value={mockClient}>
          <SignUpForm onSubmit={onSubmit}/>
        </Provider>
      )

      userEvent.type(screen.getByPlaceholderText(/First name/i), testValues.firstName)
      userEvent.type(screen.getByPlaceholderText(/Last name/i), testValues.lastName)
      userEvent.type(screen.getByPlaceholderText(/Email/i), testValues.email)
      userEvent.type(screen.getByPlaceholderText(/Password/i), testValues.password)
      userEvent.click(screen.getByRole('button', {name: /submit/i}))
    });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        firstName: testValues.firstName,
        lastName: testValues.lastName,
        email: testValues.email,
        password: testValues.password,
      })

      expect(mockClient.createUser).toBeCalledTimes(1);
      expect(mockClient.createUser).toBeCalledWith(expect.objectContaining({ testValues }))
    });
  });

})