/**
 * @format
 */

import { AppRegistry } from 'react-native';
import AppContainer from './src/navigations'
import { name as appName } from './app.json';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
AppRegistry.registerComponent(appName, () => AppContainer);
