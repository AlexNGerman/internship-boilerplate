import React  from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import SignUpForm from 'features/Authentication/organisms/SignUpForm';

const SignUp = () => {
  return (
    <MainTemplate>
      <SignUpForm />
    </MainTemplate>
  );
}

export default SignUp;
