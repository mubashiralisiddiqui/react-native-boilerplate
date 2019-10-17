import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import HistoryCard from './HistoryCard';
import { useSelector } from 'react-redux'
import { getHistorys } from '../../reducers/historyReducer';
import { RandomInteger } from '../../constants';

const DoctorHistory = () => {
    const data = useSelector(getHistorys)

    const { width } = Dimensions.get('window')
    return (
        <ScrollView horizontal={true}
            decelerationRate={0}
            showsHorizontalScrollIndicator={false}
            // snapToInterval={width}
        >
            <View style={{ width: '100%', flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                {
                    data.map(history => <HistoryCard key={RandomInteger()} data={history} />)
                }
            </View>
        </ScrollView>
    );
}

export default DoctorHistory