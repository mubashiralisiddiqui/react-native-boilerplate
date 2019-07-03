/**
 *  start of Login container
 */
import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, Animated } from 'react-native';
import { CallPlanHeader } from '../../components/Headers';
import { ImageBackgroundWrapper } from '../../components';
import { navigationOption, brandColors } from '../../constants'
import ItemCard from '../../components/Itemcard';

class CallPlans extends Component {
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Daily Calls'))
    state = {
        loading: true,
        fadeAnim: new Animated.Value(0),
        loadingButton: false,
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false})
            Animated.timing(                  // Animate over time
                this.state.fadeAnim,            // The animated value to drive
                {
                  toValue: 1,                   // Animate to opacity: 1 (opaque)
                  duration: 2000,              // Make it take a while
                }
              ).start();
        }, 2000)
    }

    onPress = () => {
        this.setState({
            loadingButton: true
        }),
        setTimeout(() => {
            this.setState({
                loadingButton: false
            })
            this.props.navigation.navigate('CallExecution')
        })
    }
    render() {
        // const {navigate} = this.props.navigation;
        
        const list = [
            {
                name: 'Amy Farha',
                type: 'A',
                category: 'Opthalmic',
                status: 1,
            },
            {
                name: 'Amir Saleem',
                type: 'A',
                category: 'Respiratory',
                status: 0,
            },
            {
                name: 'Chris Jackson',
                type: 'A',
                category: 'Respiratory',
                status: 1,
            },{
                name: 'Amy Farha',
                type: 'A',
                category: 'Opthalmic',
                status: 1,
            },
            {
                name: 'Amir Saleem',
                type: 'A',
                category: 'Respiratory',
                status: 0,
            },
            {
                name: 'Chris Jackson',
                type: 'A',
                category: 'Respiratory',
                status: 1,
            },
            // more items
        ];
        return (
            
            <View style={styles.InputContainer}>
                <ImageBackgroundWrapper>
                    <CallPlanHeader />
                    {
                        this.state.loading
                            ? <ActivityIndicator size={45} color={brandColors.lightGreen} />
                            : null
                    }
                    <Animated.ScrollView showsVerticalScrollIndicator={false} style={{ width: '99%', opacity: this.state.fadeAnim }}>
                        {
                            list.map((a, i) => {
                                return (<ItemCard
                                    key={i}
                                    name={a.name}
                                    type={a.type}
                                    category={a.category}
                                    status={a.status}
                                    loading={this.state.loadingButton}
                                    onPressHandler={this.onPress}
                                />)
                            })
                        }
                    </Animated.ScrollView>
                </ImageBackgroundWrapper>
            </View >
        )
    }
}
export default CallPlans

// end of Login container
const styles = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        // backgroundColor: '#e3ded5',
        backgroundColor: '#f1eee9',
        alignItems: 'center'
    }

}