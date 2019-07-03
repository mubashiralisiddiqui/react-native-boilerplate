import React, { Component } from 'react';
import Overlay from './LocationOverlay';
import OverlayContent from './OverlayContent';

export default class DoctorLocationOverlay extends Component {
    render() {
        const { isVisible, onChange } = this.props;
        return(
            <Overlay isVisible={isVisible} onChange={onChange}>
                <OverlayContent onChange={onChange} />
            </Overlay>
        );
    }
}