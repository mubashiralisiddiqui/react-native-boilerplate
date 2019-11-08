import React from 'react'
import { Overlay } from 'react-native-elements'
import { TerritorySelectionOverlayContent } from '..'

const TerritorySelectionOverlay = (props) => {

    return (
        <Overlay
            isVisible={props.visible}
            onBackdropPress={props.toggleVisibility}
            width="85%"
            height="50%"
            overlayBackgroundColor="#ddd"
            borderRadius={15}
            animationType={'slide'}
            children={<TerritorySelectionOverlayContent {...props} onClose={props.toggleVisibility} />}
        />
    )
}

export default TerritorySelectionOverlay