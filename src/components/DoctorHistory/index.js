import React, {Component} from 'react';
import { View, Dimensions } from 'react-native';
import { Card, Text, Image } from 'react-native-elements'
import { styles } from '../../constants';
import { ScrollView } from 'react-native-gesture-handler';
import HistoryCard from './HistoryCard';

export default class DoctorHistory extends Component {
    render() {
        const users = [
            {
                name: 'brynn',
                avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            },
            {
                name: 'brynn',
                avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            },
            {
                name: 'brynn',
                avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            },
            {
                name: 'brynn',
                avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            },
        ];

        const { width } = Dimensions.get('window')
        return (
            // <View style={styles.container}>
                <ScrollView horizontal={true}
                    decelerationRate={0}
                    snapToInterval={width - 60}
                    // snapToAlignment={"center"}
                >
                    <View style={{ width: '100%', flex: 1, flexDirection: 'row'}}>
                        <HistoryCard />
                    </View>
                </ScrollView>
            // </View>
        );
    }
}