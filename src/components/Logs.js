import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { darken } from 'polished';
import moment from 'moment';

import { readLogs } from '../actions';
import { orange, DataView } from './elements';

const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  width: ${document.body.clientWidth - 40}px;
`;

const FolderContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const LogFolder = styled.div`
  width: 15vw;
  min-width: 300px;
  width: 25%;
  margin: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 25px;
  background-color: #eee;
  padding: 10px;
`;

const FolderTitle = styled.p`
  text-transform: uppercase;
  font-weight: 900;
  font-size: 25px;
  margin-bottom: 5px;
`;

const RefreshButton = styled.button`
  border-radius: 5px;
  padding: 10px 30px;
  background-color: ${orange};
  border: 1px solid ${darken(0.3, orange)};
  font-weight: 600;
  cursor: pointer;
  :hover { background-color: ${darken(0.1, orange)} }
`;

const FileLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: ${({ recent }) => recent ? 'red' : 'inherit'};
  :hover { text-decoration: underline; }
`;

const File = ({ folder, file, recent }) => (
  <FileLink to={`/logs/${folder}/${file}`} recent={recent ? ' ' : ''}>{file}</FileLink>
);

class LogsPage extends React.Component {
  constructor(props) {
    super(props);

    this.password = this.props.password;

    this.state = {
      logs: {}
    }
  }

  componentDidMount() {
    this.props.dispatch(readLogs());
  }

  render() {
    const { logs } = this.props.logs;

    if (this.password !== this.props.password) {
      this.props.dispatch(readLogs());
      this.password = this.props.password;
    }

    const folders = Object.entries(logs)
      .filter(([ , files ]) => Object.keys(files).length > 0)
      .sort((a, b) => a[0].toUpperCase() > b[0].toUpperCase() ? 1 : -1)
      .map(([ folder, files ]) => {
        const sortedFiles = Object.keys(files).sort((a, b) => {
          return moment(a.substr(0, 8), 'DD-MM-YY').isBefore(moment(b.substr(0, 8), 'DD-MM-YY')) ? 1 : -1;
        });
        return [ folder, sortedFiles ];
      });

    return (
      <React.Fragment>
        <Helmet><title>GServer | Log</title></Helmet>
        <DataView isLoading={this.props.logs.fetching} isData={folders.length > 0} error={this.props.logs.error}>
          <Flex>
            <RefreshButton onClick={() => this.props.dispatch(readLogs())}>Refresh Log Folders</RefreshButton>
          </Flex>
          <FolderContainer>
            {folders.map(([ folder, files ]) => (
              <LogFolder key={folder}>
                <FolderTitle>{folder}</FolderTitle>
                {files.map((f, i) => <File folder={folder} file={f} key={f} recent={i === 0} />)}
              </LogFolder>  
            ))}
          </FolderContainer>
        </DataView>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ password, logs }) => ({ password, logs });
export default connect(mapStateToProps)(LogsPage);
