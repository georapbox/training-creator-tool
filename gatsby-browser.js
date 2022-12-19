// https://github.com/mui-org/material-ui/blob/master/examples/gatsby/plugins/gatsby-plugin-top-layout/gatsby-browser.js
import React from 'react';
import { WrapRootElement } from './src/components/WrapRootElement/WrapRootElement';

export const wrapRootElement = ({ element }) => {
  return <WrapRootElement>{element}</WrapRootElement>;
};
