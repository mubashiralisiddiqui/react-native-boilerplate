/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native'
import { Divider, Text } from 'react-native-elements';
import { CallPlanHeader } from '../../components/Headers'
import { brandColors, navigationOption } from '../../constants'

export default class CallExecution extends Component {
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Call Details'))

    render() {
        return (
            <View style={styles.InputContainer}>
                <CallPlanHeader />
                <ScrollView>
                    <Divider style={{ backgroundColor: brandColors.darkBrown }} />
                    <View>
                        <Text h3>Call Details</Text>
                    </View>
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