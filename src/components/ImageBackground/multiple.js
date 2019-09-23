import React, { useState, useMemo } from 'react';
import { ImageBackground, View, ScrollView, Dimensions, Image } from 'react-native';
import { useInterval } from '../../hooks/useInterval'
import { useSelector } from 'react-redux';
import { backgroundImages } from '../../reducers/authReducer';
import { baseMediaURL, RandomInteger } from '../../constants';

const { width, height } = Dimensions.get('window');

const MultipleImageBackgroundWrapper = ({
    images = [],
    children,
}) => {
    let _scrollView = null;
    const [width, setWidth] = useState(Dimensions.get('screen').width)
    const numOfBackground = images.length;
    let scrollValue = 0, scrolled = 0;
    useInterval(function () {
        scrolled++;
        if(scrolled < numOfBackground)
            scrollValue = scrollValue + width;
        else{
            scrollValue = 0;
            scrolled = 0
        }
        _scrollView && _scrollView.scrollTo({ x: scrollValue, animated: false })
    }, 3500);

    const onLayout = (e) => {
        setWidth(Dimensions.get('screen').width)
    }

    return (    
        <View onLayout={onLayout}>
            <ScrollView 
                ref={(scrollView) => { _scrollView = scrollView; }}
                horizontal={true} pagingEnabled={true} 
            >
                {
                    images.length > 0
                    ? images.map(image => <Image key={`${RandomInteger()}`} source={{ uri: `${baseMediaURL}${image.FileName}`}} resizeMode={'cover'} style={{height, width}} />)
                    : <Image source={require('../../assets/images/background.png')} resizeMode={'cover'} style={{height, width}}/>
                }
            </ScrollView>
            <View style={{width: '100%', display: 'flex', position: 'absolute', top: '25%', alignContent: 'center', alignItems: 'center'}}>
                { children }
            </View>
        </View>
    );
}

export default MultipleImageBackgroundWrapper;