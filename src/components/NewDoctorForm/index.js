import React from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';

const NewDoctorForm = ({
    data = {},
    setField = () => {}
}) => {
    return (
        <View style={{display: "flex", flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
                <Input
                    label="Name"
                    placeholder="Enter Doctor full name"
                    value={data.DoctorName}
                    onChangeText={(value) => setField('DoctorName', value)}
                />
                <Input
                    label="Phone"
                    placeholder="Enter Phone number"
                    keyboardType='number-pad'
                    value={data.DoctorPhone}
                    onChangeText={(value) => setField('DoctorPhone', value)}
                />
                <Input
                    label="Designation"
                    placeholder="Select Designation"
                />
            </View>
            <View style={{width: '50%'}}>
                <Input
                    label="Email"
                    placeholder="Enter Doctor email address"
                    keyboardType='email-address'
                    value={data.DoctorEmail}
                    onChangeText={(value) => setField('DoctorEmail', value)}
                />
                <Input
                    label="Address (Optional)"
                    placeholder="Enter address"
                    value={data.DoctorAddress}
                    onChangeText={(value) => setField('DoctorAddress', value)}
                />
                <Input
                    label="Speciality"
                    placeholder="Select Speciality"
                />
            </View>
            
        </View>
    )
}
export default NewDoctorForm;