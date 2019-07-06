import React from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { brandColors } from '../../constants';

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
                    label="Address 1"
                    numberOfLines={2}
                    placeholder="Enter Address 1"
                />
                <Input
                    label="City"
                    placeholder="Select City"
                />
                <Input
                    label="Primary Mobile Number"
                    placeholder="Enter the primary mobile number"
                />
                <Input
                    label="Designation"
                    placeholder="Select Designation"
                />
                <Input
                    label="Qualification"
                    placeholder="Select qualification"
                />
                <Input
                    label="Frequency"
                    placeholder="Select frequency"
                />
            </View>
            <View style={{width: '50%'}}>
                <Input
                    label="Gender"
                    placeholder="Enter Doctor full name"
                />
                <Input
                    label="Address 2 (Optional)"
                    placeholder="Enter address 2"
                    numberOfLines={2}
                />
                <Input
                    label="Country"
                    placeholder="Enter address 2"
                />
                <Input
                    label="Secondary Mobile Number"
                    placeholder="Enter seacondary Mobile Number"
                />
                <Input
                    label="Speciality"
                    placeholder="Select Speciality"
                />
                <Input
                    label="Class"
                    placeholder="Select Class"
                />
            </View>
            
        </View>
    )
}
export default NewDoctorForm;