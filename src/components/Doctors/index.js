import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { ImageBackgroundWrapper, NewDoctor, RequestedDoctors } from '..'
import { brandColors, RFValue, navigationOption } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { CallPlanHeader } from '../Headers';
import MyDoctors from './MyDoctors';

export default class Doctors extends Component {

    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Doctors Section'))
    
    renderScene = ({ route }) => {

        switch (route.key) {
            case 'mainList':
                return (<MyDoctors />)
            case 'requestList':
                return (<RequestedDoctors />)
            case 'newDoctor':
                return <NewDoctor />
            default:
                return null;
        }

    };

    state = {
        index: 0,
        routes: [
            { key: 'mainList', title: 'My Doctors' },
            { key: 'requestList', title: 'My Doctor Requests' },
            { key: 'newDoctor', title: 'New Doctor Request' },
        ],
    };

    render() {
        return (
            <ImageBackgroundWrapper>
                <CallPlanHeader />
                <TabView
                    navigationState={this.state}
                    renderScene={this.renderScene}
                    onIndexChange={index => console.log || this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    lazy={true}
                    removeClippedSubviews={true}
                    sceneContainerStyle={{ marginVertical: 10 }}
                    renderTabBar={props => (
                        <LinearGradient
                            colors={brandColors.linearGradientSettings.colors}
                            locations={brandColors.linearGradientSettings.locations}
                            useAngle={brandColors.linearGradientSettings.useAngle}
                        >
                            <TabBar
                                onTabPress={({ route }) => this.setState({ index: _.findIndex(this.state.routes, ['key', route.key]) })}
                                onTabLongPress={({ route }) => this.setState({ index: _.findIndex(this.state.routes, ['key', route.key]) })}
                                {...props}
                                indicatorStyle={{ backgroundColor: brandColors.darkBrown }}
                                style={{ backgroundColor: 'transparent' }}
                                labelStyle={{ fontFamily: 'Lato-SemiboldItalic', fontSize: RFValue(18) }}
                            />
                        </LinearGradient>
                    )
                    }
                />
            </ImageBackgroundWrapper>
        );
    }
}