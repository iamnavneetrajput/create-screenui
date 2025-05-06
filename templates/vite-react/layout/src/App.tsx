import React from 'react';
import Layout from './components/main/Layout';
import ErrorPage from './components/main/ErrorPage';

function App() {
  return (
    <Layout>
      <ErrorPage code="404" message="This page could not be found." />
    </Layout>
  );
}

export default App;