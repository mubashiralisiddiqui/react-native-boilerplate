import React, { useState, useEffect } from 'react';
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
    const numOfBackground = images.length;
    let scrollValue = 0, scrolled = 0;
    // if(images.length > 0) {
        console.log('gotcha')
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
    // }

    // useInterval(() => {
    //     setImage(_.nth(images, _.random(0, images.length)))
    // }, 4000)

    return (
        <View>
            <ScrollView 
                ref={(scrollView) => { _scrollView = scrollView; }}
                horizontal={true} pagingEnabled={true} 
            >
                {
                    images.map(image => console.log(`${baseMediaURL}${image.FileName}`) || <Image key={`${RandomInteger()}`} source={{ uri: `${baseMediaURL}${image.FileName}`}} resizeMode={'cover'} style={{height, width}} />)
                }
            </ScrollView>
            <View style={{width: '100%', display: 'flex', position: 'absolute', top: '20%', alignContent: 'center', alignItems: 'center'}}>
                { children }
            </View>
        </View>
    );
}

export default MultipleImageBackgroundWrapper;