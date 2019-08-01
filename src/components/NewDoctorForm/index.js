import React from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';

const NewDoctorForm = ({

}) => {
    return (
        <View style={{display: "flex", flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
                <Input
                    label="Name"
                    placeholder="Enter Doctor full name"
                />
                <Input
                    label="Phone"
                    placeholder="Enter Phone number"
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
                />
                <Input
                    label="Address (Optional)"
                    placeholder="Enter address"
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