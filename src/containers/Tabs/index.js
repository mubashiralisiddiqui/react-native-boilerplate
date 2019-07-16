import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { KeyCallInfo, EDetailing } from '../../components'
import { brandColors } from '../../constants';

const FirstRoute = () => (
  <KeyCallInfo />
  // <View style={[styles.scene, { backgroundColor: '#ff4081' }]} ><Text h1>asdsss</Text></View>
);
const SecondRoute = () => (
  <EDetailing />
);

export default class Tab extends React.Component {
  
  renderScene = ({ route }) => {
    const info = this.props.navigate.getParam('call_info');
    const files = info.Products.map(product => product.Files);
    switch (route.key) {
      case 'callingformation':
        return <KeyCallInfo info={info} />
      case 'edetailing' : 
        return <EDetailing files={files}/>
      default:
        return null;
    }
  };
  state = {
    index: 0,
    routes: [
      { key: 'callingformation', title: 'Call Information' },
      { key: 'edetailing', title: 'E-Detailing' },
    ],
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.renderScene}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props =>
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: brandColors.darkBrown }}
            style={{ backgroundColor: brandColors.lightGreen }}
            swipeVelocityImpact={1.0}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});