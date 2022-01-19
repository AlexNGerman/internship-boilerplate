import React from 'react'
import {render, screen, waitFor, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import SignUpForm from 'features/Authentication/organisms/SignUpForm';
import { createClient, Provider } from 'urql';
import { API_URL } from 'constants/api';
import { SIGNUP_FIELDS } from 'constants/formTest.constants';
const client = createClient({ url: API_URL });

describe('SignUp Formik form tests', () => {
  it('Success test', async () => {
    const onSubmit = jest.fn()
    const testValues = {
      firstName: SIGNUP_FIELDS.FIRST_NAME,
      lastName: SIGNUP_FIELDS.LAST_NAME,
      email: SIGNUP_FIELDS.EMAIL,
      password: SIGNUP_FIELDS.PASSWORD,
    };

    act(() => {
      render(
        <Provider value={client}>
          <SignUpForm onSubmit={onSubmit} {...testValues}/>
        </Provider>
      )
    });

    userEvent.type(screen.getByPlaceholderText(/First name/i), testValues.firstName)
    userEvent.type(screen.getByPlaceholderText(/Last name/i), testValues.lastName)
    userEvent.type(screen.getByPlaceholderText(/Email/i), testValues.email)
    userEvent.type(screen.getByPlaceholderText(/Password/i), testValues.password)
    userEvent.click(screen.getByRole('button', {name: /submit/i}))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        firstName: testValues.firstName,
        lastName: testValues.lastName,
        email: testValues.email,
        password: testValues.password,
      })
    })
  });

})