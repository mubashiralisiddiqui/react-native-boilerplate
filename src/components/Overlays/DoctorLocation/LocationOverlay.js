import React, { Component } from 'react';
import { Overlay, View } from 'react-native-elements';
import { brandColors } from '../../../constants'

export default class LocationOverlay extends Component {
    render() {
        const {isVisible, onChange} = this.props;
        return (            
            <Overlay 
            isVisible={isVisible}
            onBackdropPress={() => onChange(true)}
            hideModalContentWhileAnimating={true}
            height={260}
            windowBackgroundColor={brandColors.overlayColor}    
            >
                <View style={{flex: 1}}>
                    {/* {this.props.children} */}
                </View>
            </Overlay>
        );
    }
}
