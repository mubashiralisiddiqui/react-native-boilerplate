/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, ScrollView, PermissionsAndroid } from 'react-native'
import { ListItem } from 'react-native-elements';
import { CallPlanHeader } from '../../components/Headers'
import { navigationOption } from '../../constants'
import { Button as Button, ImageBackgroundWrapper } from '../../components';
import { DoctorLocationOverlay } from '../../components/Overlays/'

export default class DoctorLocation extends Component {
    state = {
        isModalVisible: false
    }
    permision = async () => {
        const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            title: 'Location Permission',
            message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        } );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log( "You can use the ACCESS_FINE_LOCATION" )
        } 
        else {
          console.log( "ACCESS_FINE_LOCATION permission denied" )
        }
    }
    toggleModal = (isBackdrop = false) => {
        isBackdrop ? this.setState({ isModalVisible: false })
        : this.setState({ isModalVisible: ! this.state.isModalVisible })
    };
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Change Doctor Location'))

    componentDidMount() {

        this.permision();
    }
    async componentWillMount() {
        await this.permision();
    }

    render() {
        // this.permision();
        const list = [
            {
                name: 'Amy Farha',
            },
            {
                name: 'Chris Jackson',
            },
            // more items
        ];
        return (
            <ImageBackgroundWrapper>
            <View style={styles.InputContainer}>
                <CallPlanHeader />
                <ScrollView>
                    {
                        list.map((a, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    title={a.name}
                                    onPress={() => this.toggleModal(false)}
                                    containerStyle={{backgroundColor: 'transparent'}}
                                    bottomDivider={true}
                                    topDivider={true}
                                    />
                            )
                        })
                    }
                    <DoctorLocationOverlay isVisible={this.state.isModalVisible} onChange={this.toggleModal} />
                </ScrollView>
            </View >
            </ImageBackgroundWrapper>
        )
    }
}

const styles = {
    InputContainer: {
        display: 'flex',
        flex: 1,
    }
}