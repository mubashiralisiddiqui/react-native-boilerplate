import React, {Component} from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar} from 'react-native-tab-view';
import { KeyCallInfo, EDetailing } from '../../components'
import KeyCallInfoUnplanned from '../../components/KeyCallInfo/unplanned'
import { brandColors } from '../../constants';

export default class Tab extends Component {
  
  renderScene = ({ route }) => {
    const info = this.props.existingCall ? this.props.navigate.getParam('call_info')
    : this.props.data
    
    const showTimePicker = this.props.existingCall ? () => {} : this.props.showTimePicker

    switch (route.key) {
      case 'callingformation':
        return this.props.existingCall
        ? <KeyCallInfo handleDatePicked={this.props.handleDatePicked && this.props.handleDatePicked} showTimePicker={showTimePicker} existingCall={this.props.existingCall} info={info} onCallReasonChange={this.props.onCallReasonChange} />
        : <KeyCallInfoUnplanned errors={this.props.errors} setDoctor={this.props.setDoctor} setMio={this.props.setMio} handleDatePicked={this.props.handleDatePicked && this.props.handleDatePicked} showTimePicker={showTimePicker} existingCall={this.props.existingCall} info={info} onCallReasonChange={this.props.onCallReasonChange} />
      case 'edetailing': 
        return <EDetailing onCloseFile={this.props.updateDetailingSeconds} files={this.props.files}/>
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
        onIndexChange={index => console.log || this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props =>
          <TabBar
            onTabPress={({ route }) => this.setState({ index: _.findIndex(this.state.routes, ['key', route.key])})}
            {...props}
            indicatorStyle={{ backgroundColor: brandColors.darkBrown }}
            style={{ backgroundColor: brandColors.lightGreen }}
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