import React, { Fragment } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import { HoverLink } from '../styles/util';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 48rem;
  margin: 8rem auto;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue_800}EE;

  p {
    margin: 0;
    line-height: 1.5;
  }
`

const Title = styled.h1`
  margin: 0 0 2rem 0;
  color: ${({ theme }) => theme.colors.gray_50};
`

function OutsideLink({ children, href, ...rest }) {
  return <HoverLink href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</HoverLink>
}

export default function AboutPage() {
  return (
    <Fragment>
      <Head>
        <Title>What Did Congress Do Today? - About</Title>
      </Head>
      <Container>
        <Title>About</Title>
        <p>
          What exactly goes on in a typical day at the Senate or the House of Representatives?
          I had no idea, but I wanted to find out. Staying informed about the political process
          is part of being a good citizen, but it can be hard to trawl through the Senate or House
          official websites to get the important information. This site was built to pull that
          information and display it in an easy-to-read format that provides the stuff
          people may actually care about. 
        </p>
        <h3>If you found this interesting, you can share it on Facebook or Twitter.</h3>
        <h3>Credits &amp; Attribution</h3>
        <p>The source code for the site is available on GitHub <OutsideLink href="https://github.com/njgingrich/whatdidcongressdo">here.</OutsideLink></p>
        <p>This site uses the great work of the <OutsideLink href="https://projects.propublica.org/api-docs/congress-api/">ProPublica Congress API</OutsideLink>.</p>
        <p>Main background image is public domain, <OutsideLink href="http://www.acclaimimages.com/_gallery/_pages/0519-1001-2819-3420.html">found here.</OutsideLink></p>
        <p>The SVG background is from heropatterns.com, licensed under CC 4.0.</p>
        <p>All times are in Eastern Standard Time (as Washington, D.C. is in EST).</p>
      </Container>
    </Fragment>
  )
}