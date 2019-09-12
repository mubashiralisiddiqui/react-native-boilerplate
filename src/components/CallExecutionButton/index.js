import React from 'react'
import {Button} from 'react-native-elements';
import { brandColors, RFValue } from '../../constants';
import PropTypes from 'prop-types'
import { MaterialIcon } from '../Icons'

const CallExecutionButton = ({
    onPress,
    disabled = false,
}) => {
    return (
        <Button
            raised
            buttonStyle={{
            width: RFValue(75),
            height: RFValue(75),
            borderRadius: RFValue(37),
            backgroundColor: brandColors.lightGreen,
            }}
            containerStyle={{
                width: RFValue(75),
                height: RFValue(75),
                borderRadius: RFValue(40),
                backgroundColor: brandColors.lightGreen,
                position: 'absolute',
                right: RFValue(50),
                bottom:RFValue(50),
                zIndex: 1000000
            }}
            icon={<MaterialIcon
                    name="check-circle"
                    color={brandColors.darkBrown}
                    size={RFValue(55)}
                    onPress={onPress}
                />}
            disabled={disabled}
        />
    );
}

CallExecutionButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}

export default CallExecutionButton;
