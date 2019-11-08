import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { Overlay, Input, Card, Button, Text } from 'react-native-elements';
import { brandColors, RFValue, validate } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { ImageBackgroundWrapper } from '..';
import { getUpdateDoctorLoader } from '../../reducers/doctorReducer';
import { useSelector } from 'react-redux';
import { getUser } from '../../reducers/authReducer';

const DoctorInfoPanel = ({
    Email = '',
    Phone = '',
    visible = false,
    submitHandler = () => null,
    toggleVisiblity = () => null,
}) => {
    const loader = useSelector(getUpdateDoctorLoader)
    const user = useSelector(getUser)
    const [email, setEmail] = useState(Email)
    const [phone, setphone] = useState(Phone)
    const [errors, setErrors] = useState({
        Email: '',
        PhoneNumber: '',
    })

    
    const [validations, setValidations] = useState({
        Email: {
            required_if: [ 'PhoneNumber', '' ],
            email: true,
        },
        PhoneNumber: {
            required_if: ['Email', ''],
            length: {
                min: 11,
                max: 11,
            },
        }
    })

    const onSubmit = useCallback(() => {
        const [validationErrors, shouldSubmit] = validate(validations, {
            Email: email,
            PhoneNumber: phone,
            EmployeeId: user.EmployeeId
        })
        if(shouldSubmit) {
            submitHandler({Email: email, Phone: phone}, toggleVisiblity, () => {
                setErrors({
                    Email: email !== '' ? 'This email is already exist.' : '',
                    PhoneNumber: phone !== '' ? 'This phone number is already exist.' : ''
                })
            })

            return;
        }
        setErrors(validationErrors)
    })

    return (
        <Overlay
            animationType={'slide'}
            overlayBackgroundColor="#ddd"
            width="80%"
            height={400}
            borderRadius={15}
            isVisible={visible}
            onBackdropPress={toggleVisiblity}
            children={
                <ImageBackgroundWrapper>
                    <Card
                        containerStyle={{ borderWidth: 0, backgroundColor: 'transparent', elevation: 0, }}
                        title="Missing Doctor Information"
                        titleStyle={{ fontFamily: 'Lato-BoldItalic', fontSize: RFValue(16), color: brandColors.green}}
                    >
                        <View>
                            <Input errorMessage={errors.Email} label="Email" keyboardType='email-address' value={email} placeholder="Doctor's Email" onChangeText={setEmail}/>
                            <Input errorMessage={errors.PhoneNumber} label="Phone Number" keyboardType='number-pad'  value={phone} placeholder="Doctor's Phone Number" onChangeText={setphone}/>
                        </View>
                        <Button
                            loading={loader}
                            disabled={loader}
                            ViewComponent={LinearGradient}
                            linearGradientProps={brandColors.linearGradientSettings}
                            buttonStyle={{
                                marginVertical: 5,
                                borderRadius: 33,
                                width: '100%',
                                backgroundColor: brandColors.lightGreen,
                                position: 'relative'
                            }}
                            onPress={onSubmit}
                            title="Submit"
                        />
                    </Card>
                    <Text style={{ marginLeft:5, fontFamily: 'Lato-MediumItalic', fontSize: RFValue(14), color: 'red' }}>
                        It seems that the system does not have these information of the doctor, please provide them to execute this call.
                    </Text>
                </ImageBackgroundWrapper>
            }
        >
        </Overlay>
    );
}

export default DoctorInfoPanel