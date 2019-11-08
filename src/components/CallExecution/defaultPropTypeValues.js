import PropTypes from 'prop-types'
import { RandomInteger } from '../../constants';

export const propTypesFieldHeader = {
    key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    title: PropTypes.string,
    onRemove: PropTypes.func,
}

export const defaultValuesFieldHeader = {
    key: RandomInteger(),
    title: '',
    onRemove: () => {},
}

export const propTypesCallRemarks = {
    onChangeCallRemarks: PropTypes.func.isRequired
}

export const propTypesGiftField = {
    showGifts: PropTypes.func,
    selectedGift: PropTypes.array,
    gifts: PropTypes.array
}

export const defaultPropValuesGiftField = {
    showGifts: () => {},
    selectedGift: [],
    gifts: [],
}

export const defaultPropsNotesField = {
    onChangeAdditionalNotes: PropTypes.func.isRequired
}
