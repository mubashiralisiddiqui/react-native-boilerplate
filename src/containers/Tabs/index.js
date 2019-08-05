import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { KeyCallInfo, EDetailing } from '../../components'
import { brandColors } from '../../constants';

export default class Tab extends React.Component {
  
  renderScene = ({ route }) => {
    const info = this.props.existingCall ? this.props.navigate.getParam('call_info')
    : this.props.data
    
    const showTimePicker = this.props.existingCall ? () => {} : this.props.showTimePicker
    
    const files = (this.props.existingCall ? info.Products : [] ).map(product => {
      if(product.Files.length > 0) return product.Files
    }).filter(file => file !== undefined);
    
    switch (route.key) {
      case 'callingformation':
        return <KeyCallInfo handleDatePicked={this.props.handleDatePicked && this.props.handleDatePicked} showTimePicker={showTimePicker} existingCall={this.props.existingCall} info={info} onCallReasonChange={this.props.onCallReasonChange} />
      case 'edetailing': 
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