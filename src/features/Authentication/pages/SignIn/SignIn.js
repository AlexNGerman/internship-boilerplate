import React, { Component } from 'react';
import PageTempate from 'components/templates/PageTempate';
import SignInForm from 'features/Authentication/organisms/SignInForm';

export class SignIn extends Component {

  render() {
    return (
      <PageTempate children={<SignInForm />}/>
    );
  }
}

export default SignIn;