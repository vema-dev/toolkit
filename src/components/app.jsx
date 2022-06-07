import React from 'react';

import {
  App,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  NavRight,
  Toolbar,
  Link,
  Block,
} from 'framework7-react';

import routes from '../js/routes';

const MyApp = () => {
  const f7params = {
    name: 'Vema Dev Toolkit',
    theme: 'aurora',
    routes: routes,
  };


  return (
    <App { ...f7params } >
      <Views tabs className="safe-areas">
        <Navbar style={{zIndex: 10000}} title='Vema Dev Toolkit' />

        <Toolbar tabbar labels top>
          <Link tabLink="#view-colors" tabLinkActive iconAurora="f7:square_pencil" text="Colors" />
          <Link tabLink="#view-css" iconAurora="f7:square_stack_3d_down_dottedline" text="CSS" />
          <Link tabLink="#view-generators" iconAurora="f7:paintbrush" text="Generators" />
          <Link tabLink="#view-other" iconAurora="f7:circle_grid_hex" text="Other" />
        </Toolbar>

        <View id="view-colors" main tab tabActive url="/" />
        <View id="view-css" name="css" tab url="/css/" />
        <View id="view-generators" name="generators" tab url="/generators/" />
        <View id="view-other" name="other" tab url="/other/" />

      </Views>

    </App>
  )
}
export default MyApp;
