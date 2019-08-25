import React from 'react'
import {Button} from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { brandColors } from '../../constants';
import PropTypes from 'prop-types'

const CallExecutionButton = ({
    onPress,
    disabled = false,
}) => {
    return (
        <Button
            raised
            buttonStyle={{
            width: 75,
            height: 75,
            borderRadius: 37,
            backgroundColor: brandColors.lightGreen,
            }}
            containerStyle={{
                width: 75,
                height: 75,
                borderRadius: 40,
                backgroundColor: brandColors.lightGreen,
                position: 'absolute',
                right: 50,
                bottom:50,
                zIndex: 1000000
            }}
            icon={<MaterialIcon
                    name="check-circle"
                    color={brandColors.darkBrown}
                    size={55}
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
