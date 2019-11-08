import React from 'react'
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import { brandColors, RFValue } from '../../constants';
import styles from './styles'

const Checkbox = (props) => {
    return (
        <CheckBox
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxTextStyle}
            checkedColor={brandColors.lightGreen}
            title={props.title}
            checked={props.checked}
            size={RFValue(20)}
            onPress={props.onCheckedCallback != undefined ? () => props.onCheckedCallback() : () => null}
        />
    );
}

Checkbox.propTypes = {
    title: PropTypes.string,
    checked: PropTypes.bool,
    onCheckedCallback: PropTypes.func
}
Checkbox.defaultProps = {
    title: 'Checkbox',
    checked: false,
};

export default Checkbox;