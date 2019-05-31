/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native'
import { ListItem, Divider, Icon } from 'react-native-elements';
import { CallPlanHeader } from '../../components/Headers'
import { brandColors } from '../../constants'
import ItemCard from '../../components/Itemcard';

class CallPlans extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Daily Calls',
        headerStyle: {
            backgroundColor: brandColors.lightGreen,
        },
        headerTintColor: brandColors.darkBrown,
        titleStyle: {
            textAlign: 'center',
            alignSelf: 'center'
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: 'center',
            flex: 1,
        },
        headerLeft: <Icon
            name="more-vertical"
            type="feather"
            size={25}
            color={brandColors.darkBrown}
            iconStyle={{ paddingLeft: 10 }}
            onPress={() => { navigation.openDrawer(); }}
        />,
    });

    render() {
        const list = [
            {
                name: 'Amy Farha',
                type: 'A',
                category: 'Opthalmic'
            },
            {
                name: 'Chris Jackson',
                type: 'A',
                category: 'Respiratory'
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
                            return (<ItemCard
                                key={i}
                                name={a.name}
                                type={a.type}
                                category={a.category}
                            />)
                        })
                    }
                </ScrollView>
            </View >
        )
    }
}
export default CallPlans

// end of Login container
const styles = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
    }

}