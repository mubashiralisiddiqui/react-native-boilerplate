import React from 'react'
import { Overlay } from 'react-native-elements'
import { ReviewChangesOverlayContent } from '..'
import PendingRequestsOverlayContent from './PendingRequestsOverlayContent';

const PendingRequestsOverlay = (props) => {
    const { visible, toggleVisibility } = props;
    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={toggleVisibility}
            width={'75%'}
            height={'60%'}
            borderRadius={15}
            animationType="slide"
            overlayBackgroundColor="#ddd"
            children={<PendingRequestsOverlayContent {...props} />}
        />
    )
}

export default PendingRequestsOverlay