/**
 * @format
 */
import React from 'react'
import { AppRegistry } from 'react-native';
import AppContainer from './src/navigations'
import { name as appName } from './app.json';
import { Provider } from 'react-redux';

import configureStore from './store';

const store = configureStore()

const RNRedux = () => (
  <Provider store = { store }>
    <AppContainer />
  </Provider>
)
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
AppRegistry.registerComponent(appName, () => RNRedux);
