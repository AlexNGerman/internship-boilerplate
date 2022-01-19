import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import SignUpForm from 'features/Authentication/organisms/SignUpForm';
import { createClient, Provider } from 'urql';
import { API_URL } from 'constants/api';
import { SIGNUP_FIELDS } from 'constants/formTest.constants';
const client = createClient({ url: API_URL });


describe('SignUp Formik form tests', () => {
  it('Success test', async () => {
    const handleSubmit = jest.fn()
    await render(
      <Provider value={client}>
        <SignUpForm onSubmit={handleSubmit} />
      </Provider>
    )

    userEvent.type(screen.getByLabelText(/First name/i), SIGNUP_FIELDS.FIRST_NAME)
    userEvent.type(screen.getByLabelText(/Last name/i), SIGNUP_FIELDS.LAST_NAME)
    userEvent.type(screen.getByLabelText(/Email/i), SIGNUP_FIELDS.EMAIL)
    userEvent.type(screen.getByLabelText(/Password/i), SIGNUP_FIELDS.PASSWORD)

    userEvent.click(screen.getByRole('button', {name: /submit/i}))

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith({
        firstName: SIGNUP_FIELDS.FIRST_NAME,
        lastName: SIGNUP_FIELDS.LAST_NAME,
        email: SIGNUP_FIELDS.EMAIL,
        password: SIGNUP_FIELDS.PASSWORD,
      })
    })
  });

})