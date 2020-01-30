import App from 'next/app'
import React, { Fragment } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Navigation from '../components/Navigation'
import PageShell from '../components/PageShell'
import theme from '../styles/theme'

const Background = styled.div`
  position: fixed;
  top: 56px;
  left: -4px;
  right: -4px;
  height: calc(100vh - 52px);
  width: calc(100% + 8px);
  z-index: 0;
  background-image: url('/static/images/sotu_full.jpg');
  background-size: cover;
  filter: blur(2px);
`

export default class BaseApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Navigation />
          <PageShell>
            <Component {...pageProps} />
          </PageShell>
          <Background />
        </Fragment>
      </ThemeProvider>
    )
  }
}
