import React from 'react';
import ImportedLoader from 'react-loader';
import styled from 'styled-components';

export const Centred = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loader = () => (
  <Centred style={{ width: '100%', height: '100%' }}>
    <ImportedLoader loaded={false} length={20} radius={30} width={10} lines={13} />
  </Centred>
);

const ErrorBox = styled(Centred)`
  text-align: center;
  flex-direction: column;
  width: 50%;
  margin: 10vh auto;
  padding: 30px;
  border: 2px solid #a00;
  background-color: #FFBABA;
  color: #D8000C;
  & > * { margin: 10px; }
  @media (max-width: 768px) {
    height: auto;
    width: 100%;
    margin-top: 0px;
  }
`;

const ErrorTitle = styled.h1`
  display: flex;
  align-items: center;
  font-weight: 900;
  letter-spacing: 0.1em;
  span:not(.title) { padding-bottom: 5px; }
`;

export const ErrorWindow = ({ message }) => (
  <Centred style={{ width: '100%', height: '100%' }}>
    <ErrorBox>
      <ErrorTitle>
        <span role='img' aria-label="logs">⚠️</span>
        <span className="title">Error</span>
        <span role='img' aria-label="logs">⚠️</span>
      </ErrorTitle>
      <h2>{message || 'Something went wrong...'}</h2>
      <p><b>Note:</b> You should check the password entered in the header bar.</p>
    </ErrorBox>
  </Centred>
);

export default ({ isLoading, isData, error, children }) => {
  if (isLoading) return <Loader />;
  if (!isData) return <ErrorWindow message={(error || {}).message} />;
  return children;
}
