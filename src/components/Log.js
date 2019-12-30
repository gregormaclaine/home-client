import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { readLog } from '../actions';
import { darken } from 'polished';
import { Loader, orange, green, ErrorWindow } from './elements';

const Flex = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0px;
  width: 100%;
  & > * { margin: 5px; }
  @media (max-width: 768px) {
    flex-direction: column;
    & > * {
      margin-top: 5px;
      width: 90%;
    }
    & > div { padding: 5px 0px; }
  }
`;

const BackButton = styled.button`
  border-radius: 10px;
  background-color: inherit;
  border: 1px solid #aaa;
  margin: 10px;
  cursor: pointer;
  font-weight: 600;
`;

const RefreshButton = styled.button`
  border-radius: 10px;
  padding: 10px 20px;
  border: 1px solid ${darken(0.3, orange)};
  background-color: ${orange};
  font-weight: 600;
  cursor: pointer;
  :hover { background-color: ${darken(0.1, orange)}; }
`;

const ShowNonAuthButton = styled.button`
  border-radius: 10px;
  padding: 10px 20px;
  border: 1px solid ${darken(0.3, green)};
  background-color: ${green};
  font-weight: 600;
  cursor: pointer;
  color: white;
  letter-spacing: 0.03em;
  &>* { text-shadow: 1px 1px ${darken(0.1, green)}, -1px -1px ${darken(0.1, green)}, -1px 1px ${darken(0.1, green)}, 1px -1px ${darken(0.1, green)}; }
  :hover { background-color: ${darken(0.1, green)}; }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 5px 15px;
`;

const Page = styled.button`
  padding: 8px 8px;
  background-color: white;
  border-width: 0px;
  border-radius: 5px;
  cursor: pointer;
  width: 48px;
  text-align: center;
  ${({ active }) => active ? `
    background-color: ${orange};
    color: white;
  ` : `
    :hover { background-color: #ddd; }
  `}
`;

const ErrorCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid black;
  font-weight: 600;
  padding: 5px 10px;
  span { margin-bottom: 5px; margin-right: 5px; }
`;

const pageMax = 50;

class LogPage extends React.Component {
  constructor(props) {
    super(props);

    this.password = this.props.password;

    this.state = {
      folder: this.props.match.params.folder,
      file: this.props.match.params.file,
      showNonAuth: false,
      page: 1
    }
  }

  getLogText = () => this.props.dispatch(readLog(this.state.folder, this.state.file));

  componentDidMount() {
    this.getLogText();
  }

  render() {
    const { folder, file, showNonAuth } = this.state;

    const text = (this.props.logs.logs[folder] || {})[file] || '';

    if (this.password !== this.props.password) {
      this.getLogText();
      this.password = this.props.password;
    }

    if (this.props.logs.fetching) return <Loader />;
    if (this.props.logs.error) return <ErrorWindow message={this.props.logs.error.message} />;
    if (!text) return <ErrorWindow />;

    const lines = text.split('\n').reverse().filter(line => line && (showNonAuth || !line.includes('❌')));
    const numOfPages = Math.ceil(lines.length / pageMax) || 1;
    const page = Math.min(numOfPages, this.state.page);
    const startPage = Math.max(1, Math.max(1, page - 3) - Math.max(0, page + 3 - numOfPages));

    return (
      <React.Fragment>
        <Helmet><title>GServer | Logs</title></Helmet>
        <Flex>
          <BackButton onClick={this.props.history.goBack}><span role='img' aria-label="logs">⬅</span> Back</BackButton>
          <RefreshButton onClick={this.getLogText}><span role='img' aria-label="logs">🔄</span> Refresh</RefreshButton>
          <ShowNonAuthButton onClick={() => this.setState(ps => ({ showNonAuth: !ps.showNonAuth }))}>
            <span role='img' aria-label="logs">{showNonAuth ? '✔️' : '❌'}</span>
            {' Show non-authenticated requests'}
          </ShowNonAuthButton>
          <span style={{ flexGrow: 1 }} />
          <PaginationContainer>
            <Page onClick={() => this.setState({ page: Math.max(page - 1, 1) })}>&laquo;</Page>
            {Array(Math.min(7, numOfPages)).fill(0).map((v, i) => (
              <Page key={i} active={i + startPage === page} onClick={() => this.setState({ page: i + startPage })}>{i + startPage}</Page>
            ))}
            <Page onClick={() => this.setState({ page: Math.min(page + 1, numOfPages) })}>&raquo;</Page>
          </PaginationContainer>
          <span style={{ flexGrow: 1 }} />
          <ErrorCount><span role='img' aria-label="logs">⚠️</span>{text.split('\n').filter(line => line.includes('⚠️')).length} Errors</ErrorCount>
        </Flex>
        <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{lines.slice((page - 1) * pageMax, page * pageMax + 1).join('\n')}</p>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ password, logs }) => ({ password, logs });
export default connect(mapStateToProps)(LogPage);
