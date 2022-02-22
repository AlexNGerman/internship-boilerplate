import React from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import SignInForm from 'features/Authentication/organisms/SignInForm';

const SignIn = () => {
  return (
    <MainTemplate>
      <SignInForm/>
    </MainTemplate>
  );
}

export default SignIn;
