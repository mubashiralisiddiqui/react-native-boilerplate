import PropTypes from 'prop-types';

export const propTypes = {
    showGifts: PropTypes.func,
    selectedGift: PropTypes.array,
    gifts: PropTypes.array
}

export const defaultPropValues = {
    showGifts: () => {},
    selectedGift: [],
    gifts: [],
}