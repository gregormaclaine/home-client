import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { changePassword } from './actions'

import Header from './components/Header';

import HomePage from './components/Home';
import LogsPage from './components/Logs';
import LogPage from './components/Log';
import NotFoundPage from './components/NotFoundPage';

class App extends React.Component {
  render() {
    const { password } = this.props;
    
    return (
      <Router>
        <Header password={password} changePassword={p => this.props.dispatch(changePassword(p))} />
        <Switch>
          <Route path="/" exact={true} component={HomePage} />
          <Route path="/logs" exact={true} component={LogsPage} />
          <Route path="/logs/:folder/:file" component={LogPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(App);
