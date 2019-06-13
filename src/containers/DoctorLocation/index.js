/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native'
import { ListItem, Divider, Icon } from 'react-native-elements';
import { CallPlanHeader } from '../../components/Headers'
import { brandColors, navigationOption } from '../../constants'
import ItemCard from '../../components/Itemcard';

export default class DoctorLocation extends Component {
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Change Doctor Location'))
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
                                    onPress={() => alert(33)}
                                />
                            )
                        })
                    }
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