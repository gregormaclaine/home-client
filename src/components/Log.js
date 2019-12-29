import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { readLog } from '../actions';

const Line = styled.p`
  margin: 0px;
`;

const BackButton = styled.button`
  border-radius: 10px;
  background-color: inherit;
  border: 1px solid #aaa;
  margin: 10px;
  cursor: pointer;
`;

class LogPage extends React.Component {
  constructor(props) {
    super(props);

    this.password = this.props.password;

    this.state = {
      folder: this.props.match.params.folder,
      file: this.props.match.params.file,
    }
  }

  getLogText() {
    this.props.dispatch(readLog(this.state.folder, this.state.file));
  }

  componentDidMount() {
    this.getLogText();
  }

  render() {
    const text = (this.props.logs.logs[this.state.folder] || {})[this.state.file] || '';
    if (this.password !== this.props.password) {
      this.getLogText();
      this.password = this.props.password;
    }
    //if (!text && !this.props.logs.fetching && !this.props.logs.fetched && !this.props.logs.error) this.props.dispatch(readLog(this.state.folder, this.state.file));

    return (
      <React.Fragment>
        <Helmet><title>GServer | Logs</title></Helmet>
        <BackButton onClick={this.props.history.goBack}><span role='img' aria-label="logs">⬅</span> Back</BackButton>
        {text.split('\n').map(line => <Line key={line}>{line}</Line>)}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ password, logs }) => ({ password, logs });
export default connect(mapStateToProps)(LogPage);
