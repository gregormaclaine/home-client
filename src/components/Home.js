import React from 'react';
import { Helmet } from 'react-helmet';

import api from '../utilities/api';

class HomePage extends React.Component {
  componentDidMount() {
    api('/');
  }

  render() {
    return (
      <React.Fragment>
        <Helmet><title>GServer</title></Helmet>
        <p style={{ textAlign: 'center' }}>what are you doing on my website</p>
      </React.Fragment>
    );
  }
}

export default HomePage
