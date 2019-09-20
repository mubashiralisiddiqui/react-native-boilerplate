import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import HistoryCard from './HistoryCard';
import { useSelector } from 'react-redux'
import { getHistorys } from '../../reducers/historyReducer';

const DoctorHistory = () => {
    const data = useSelector(getHistorys)

    const { width } = Dimensions.get('window')
    return (
        <ScrollView horizontal={true}
            decelerationRate={0}
            snapToInterval={width - 60}
        >
            <View style={{ width: '100%', flex: 1, flexDirection: 'row'}}>
                {
                    data.map(history => <HistoryCard data={history} />)
                }
            </View>
        </ScrollView>
    );
}

export default DoctorHistory