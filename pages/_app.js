import App, { Container } from 'next/app';
import React from 'react';
import withReduxStore from '../lib/withReduxStore';
import { Provider } from 'react-redux';
import Header from '../components/Header';

class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Header />
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
