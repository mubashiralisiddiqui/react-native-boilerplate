import React, {Component} from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import HistoryCard from './HistoryCard';
import { useSelector } from 'react-redux'

export default class DoctorHistory extends Component {
    render() {
        const data = useSelector(state => state.history.history)
        console.log(data, 'history')

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