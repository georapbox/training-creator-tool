// https://github.com/mui-org/material-ui/blob/master/examples/gatsby/plugins/gatsby-plugin-top-layout/gatsby-browser.js

import React from 'react';
// import TopLayout from './../TopLayout/TopLayout';
import SideNavigation from './../SideNavigation/SideNavigation';
import { CacheProvider } from '@emotion/react';
import getEmotionCache from '../../utils/getEmotionCache';
import './_reset.css';
import './_elements.css';
import './themes.css';

const cache = getEmotionCache();

export const WrapRootElement = ({ children }) => {
  return (
    <CacheProvider value={cache}>
      {/* <TopLayout> */}
      <SideNavigation />
      {children}
      {/* </TopLayout> */}
    </CacheProvider>
  );
};
