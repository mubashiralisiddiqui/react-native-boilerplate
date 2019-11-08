import React, { useCallback } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import DoctorListItem from './DoctorListItem';
import { getDoctors, getPendingRequests } from '../../reducers/doctorReducer';
import { useSelector } from 'react-redux'
import { NoItemsInTheList, DoctorListHeader, PendingRequestsHeader } from '..';
import PendingRequestListItem from './PendingRequestListItem';

export default function DoctorList({
    isPending = false,
}) {
    const doctors = useSelector(isPending === false ? getDoctors : getPendingRequests)
    const _render = useCallback(props => isPending === false  ? <DoctorListItem {...props} /> : <PendingRequestListItem {...props} />)
    const _key = useCallback(item => isPending === false ? `${item.Id}` : `${item.DoctorRequestId}`)
    return(
        <ScrollView>
            <FlatList
                ListHeaderComponent={isPending === false ? <DoctorListHeader /> : <PendingRequestsHeader />}
                removeClippedSubviews={true}
                initialNumToRender={20}
                ListEmptyComponent={<NoItemsInTheList message="No doctors found" />}
                data={doctors}
                keyExtractor={_key}
                renderItem={_render}
            />
        </ScrollView>

    )
} 