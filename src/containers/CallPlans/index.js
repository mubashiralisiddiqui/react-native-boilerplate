/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View } from 'react-native'
import { ListItem, Divider, Icon } from 'react-native-elements';
import {CallPlans as CallPlansHeader} from '../../components/Headers'
import { brandColors } from '../../constants'

class CallPlans extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'TolkNu',
        headerStyle: {
            backgroundColor: '#103c84',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: 15
        },
        headerRight: <Icon
            name="menu"
            size={25}
            color="#000"
            iconStyle={{ marginRight: 10 }}
            onPress={() => { navigation.openDrawer(); }}
        />,
    });

    render() {
        const list = [
            {
              name: 'Amy Farha',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              subtitle: 'Vice President'
            },
            {
              name: 'Chris Jackson',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              subtitle: 'Vice Chairman'
            },
             // more items
          ];
        return (
            <View style={styles.InputContainer}>
            <CallPlansHeader />
            <Divider style={{ backgroundColor: brandColors.darkBrown }} />
                {
                    list.map((l, i) => (
                    <ListItem
                        key={i}
                        rightAvatar={{ source: { uri: l.avatar_url } }}
                        title={l.name}
                        subtitle={l.subtitle}
                    />
                    ))
                }
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