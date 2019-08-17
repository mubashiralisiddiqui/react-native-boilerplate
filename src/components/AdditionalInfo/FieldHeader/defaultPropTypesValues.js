import PropTypes from 'prop-types'
import { RandomInteger } from '../../../constants';

export const propTypes = {
    key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    title: PropTypes.string,
    onRemove: PropTypes.func,
}

export const defaultValues = {
    key: RandomInteger(),
    title: '',
    onRemove: () => {},
}