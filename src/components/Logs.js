import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import { readLogs } from '../actions';

const FolderContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;
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
`;

const FileLink = styled(Link)`
  text-decoration: none;
  ${({ bold, recent }) => (bold || recent) ? 'font-weight: 600;' : ''}
  color: ${({ recent }) => recent ? 'red' : 'inherit'};
  :hover { text-decoration: underline; }
`;

const File = ({ folder, file, recent }) => (
  <FileLink to={`/logs/${folder}/${file}`} bold={file.includes('(') ? '' : ' '} recent={recent ? ' ' : ''}>
    {file}
  </FileLink>
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

  getRecentFiles() {
    return Object.entries(this.props.logs.logs).reduce((obj, [ folder, files ]) => {
      const recentDate = moment(Object.keys(files).map(f => moment(f.substr(0, 8), 'DD-MM-YY')).reduce((r, f) => moment(r).isAfter(f) ? r : f)).format('DD-MM-YY');
  
      const todaysFiles = Object.keys(files).filter(f => f.substr(0, 8) === recentDate);
      const file = todaysFiles.reduce((max, file) => {
        const maxNum = max.match(/\((\d+)\)/);
        const fileNum = file.match(/\((\d+)\)/);
        return parseInt(maxNum ? maxNum[1] : '1') > parseInt(fileNum ? fileNum[1] : '1') ? max : file;
      });

      return { ...obj, [folder]: file };
    }, {});
  }

  render() {
    const { logs } = this.props.logs;
    const recentFiles = this.getRecentFiles();

    if (this.password !== this.props.password) {
      this.props.dispatch(readLogs());
      this.password = this.props.password;
    }

    return (
      <React.Fragment>
        <Helmet><title>GServer | Log</title></Helmet>
        <FolderContainer>
          {Object.entries(logs).sort((a, b) => a[0].toUpperCase() > b[0].toUpperCase() ? 1 : -1).map(([folder, files]) => (
            <LogFolder key={folder}>
              <FolderTitle>{folder}</FolderTitle>
              {Object.keys(files).map(f => <File folder={folder} file={f} key={f} recent={recentFiles[folder] === f} />)}
            </LogFolder>
          ))}
        </FolderContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ password, logs }) => ({ password, logs });
export default connect(mapStateToProps)(LogsPage);
