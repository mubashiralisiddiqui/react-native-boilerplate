/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, ScrollView, PermissionsAndroid } from 'react-native'
import { ListItem, Divider, Icon, Text, Button } from 'react-native-elements';
import { CallPlanHeader } from '../../components/Headers'
import { brandColors, navigationOption } from '../../constants'
import Modal from "react-native-modal";

export default class DoctorLocation extends Component {
    state = {
        isModalVisible: false
    }
     permision = async () => {

    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Change Doctor Location'))

    componentDidMount() {

        const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
        if (granted) {
          console.log( "You can use the ACCESS_FINE_LOCATION" )
        } 
        else {
          console.log( "ACCESS_FINE_LOCATION permission denied" )
        }
    }

    render() {
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
            <View style={styles.InputContainer}>
                <ScrollView>
                    <CallPlanHeader />
                    <Divider style={{ backgroundColor: brandColors.darkBrown }} />
                    {
                        list.map((a, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    title={a.name}
                                    onPress={this.toggleModal}
                                />
                            )
                        })
                    }
                    <Modal 
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                    hideModalContentWhileAnimating={true}
                    >
                        <View style={{ flex: 1, backgroundColor: 'white', height: 'auto' }}>
                            <Text>Hello!</Text>
                            <Button title="Submit" onPress={this.toggleModal} />
                        </View>
                    </Modal>
                </ScrollView>
            </View >
        )
    }
}

// end of Login container
const styles = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
    }
}