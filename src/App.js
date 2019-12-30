import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';

import HomePage from './components/Home';
import LogsPage from './components/Logs';
import LogPage from './components/Log';
import NotFoundPage from './components/NotFoundPage';
//style={{ width: document.body.clientWidth }}
class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/logs" exact component={LogsPage} />
            <Route path="/logs/:folder/:file" component={LogPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
