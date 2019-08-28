import App from 'next/app'
import React, { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'

import Navigation from '../components/Navigation'
import PageShell from '../components/PageShell'
import theme from '../styles/theme'

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
        </Fragment>
      </ThemeProvider>
    )
  }
}
