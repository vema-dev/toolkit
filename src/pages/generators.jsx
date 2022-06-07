import React from 'react';
import { Page, Navbar, Block, BlockTitle } from 'framework7-react';

const AboutPage = () => (
  <Page>
    <Navbar title="About" backLink="Back" />
    <BlockTitle>Generators</BlockTitle>
    <Block strong>
      <p>CSS button and card generator with local save templates.</p>
      <p>TODO :)</p>
    </Block>
  </Page>
);

export default AboutPage;
