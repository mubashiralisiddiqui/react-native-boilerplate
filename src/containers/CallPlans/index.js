/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native'
import { ListItem, Divider, Icon } from 'react-native-elements';
import { CallPlanHeader } from '../../components/Headers'
import { brandColors, navigationOption } from '../../constants'
import ItemCard from '../../components/Itemcard';

class CallPlans extends Component {
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Daily Calls'))
    render() {
        const {navigate} = this.props.navigation;
        const list = [
            {
                name: 'Amy Farha',
                type: 'A',
                category: 'Opthalmic'
            },
            {
                name: 'Amir Saleem',
                type: 'A',
                category: 'Respiratory'
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
                <CallPlanHeader />
                <ScrollView>
                    <Divider style={{ backgroundColor: brandColors.darkBrown }} />
                    {
                        list.map((a, i) => {
                            return (<ItemCard
                                key={i}
                                name={a.name}
                                type={a.type}
                                category={a.category}
                                onPressHandler={() => navigate('CallExecution')}
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