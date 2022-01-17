import React, { Component } from 'react';
import SignUpForm from 'features/Authentication/organisms/SignUpForm';
import PageTempate from "components/templates/PageTempate/pageTemplate";

export class SignUp extends Component {

  render() {
    return (
      <PageTempate children={<SignUpForm />}/>
    );
  }
}

export default SignUp;