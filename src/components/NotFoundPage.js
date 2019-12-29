import React from 'react';

const NotFoundPage = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
    <h1 style={{ marginBottom: 0 }}>Error 404</h1>
    <h2 style={{ marginTop: 5 }}>The page could not be found<br />Note: This could be due to you not being authenitcated</h2>
  </div>
)

export default NotFoundPage;
