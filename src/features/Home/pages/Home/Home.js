import React, { Component } from 'react';
import PageTempate from 'components/templates/PageTempate';

export class Home extends Component {

  render() {
    return (
      <PageTempate children={'Home page'}/>
    );
  }
}

export default Home;