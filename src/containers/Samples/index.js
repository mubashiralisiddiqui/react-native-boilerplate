import React, { PureComponent } from 'react'
import { View, Dimensions } from 'react-native';
import { ImageBackgroundWrapper } from '../../components';
import { CallPlanHeader } from '../../components/Headers';
import { navigationOption, RandomInteger, brandColors } from '../../constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getSamples } from '../../reducers/productsReducer';
import { Text, Divider, Card } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';

class Samples extends PureComponent {
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Samples'))

    state = {
        width: Dimensions.get('screen').width
    }

    componentDidMount() {
        // console.log(this.props.samples, 'asdasd')
    }

    onLayout = (e) => {
        this.setState({
            width: Dimensions.get('screen').width
        })
    }

    render() {
        const styles = getStyles()
        return (
            <ImageBackgroundWrapper>
                <CallPlanHeader />
                {/* <ScrollView> */}
                {/* <View style={{width: '100%', justifyContent: 'center'}}> */}
                    
                    
                    <KeyboardAwareScrollView contentContainerStyle={{ width: '100%', display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'}}>
                        <Card key={RandomInteger()}
                            containerStyle={styles.cardContainer}
                        >
                            <View onLayout={this.onLayout} key={RandomInteger()} style={styles.viewContainer}> 
                                <View key={RandomInteger()} style={styles.itemSecondLast}>
                                    <Text key={RandomInteger()} style={styles.textTitle}>Sample Name</Text>
                                </View>
                                <View  key={RandomInteger()} style={styles.itemLast}>
                                    <Text key={RandomInteger()} style={styles.textTitle}>On Hand Quantity</Text>
                                </View>
                            </View>
                        </Card>
                        {
                            this.props.samples.map(sample => <_render item={sample} />)
                        }
                    </KeyboardAwareScrollView>
            </ImageBackgroundWrapper>
        )
    }
}


/**
 * @const function mapStateToProps
 * @description It will map the redux state to this component
 * @param {*} state
 * @returns Object
 * @memberof CallExecution
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
const mapStateToProps = state => {
    return {
        samples: getSamples(state),
    }
}

/**
 * @const function mapDispatchToProps
 * @description It will actionable redux methods to this component
 * @param {*} dispatch
 * @returns Object
 * @memberof CallExecution
 * @author Muhammad Nauman <muhammad.nauman@hudsonpharma.com>
 */
const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)
const getStyles = () => {
    return {
        viewContainer: {
            // display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            width: '100%',
            height: 15,
            paddingLeft: 0,
        },
        itemSecondLast: {
            height: 15,
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%'
        },
        itemLast: {
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%'
        },
        textTitle: {
            fontSize: RFValue(18),
            fontFamily: 'Lato-MediumItalic',
            color: brandColors.lightGreen,
        },
        text: {
            fontSize: RFValue(16),
            fontFamily: 'Lato-Regular',
            color: brandColors.darkBrown,
        },
        cardContainer: {
            backgroundColor: brandColors.darkBrown,
            shadowColor: brandColors.lightGreen,
            borderRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
            width: '80%',
            justifyContent: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },
        listCardContainer: {
            backgroundColor: 'transparent',
            // shadowColor: brandColors.lightGreen,
            borderRadius: 1,
            width: '80%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }
    }
}

_render = ({ item }) => {
    const styles = getStyles()
    return (
        <Card key={RandomInteger()}
            containerStyle={styles.listCardContainer}
        >
            <View onLayout={this.onLayout} key={RandomInteger()} style={styles.viewContainer}> 
                <View key={RandomInteger()} style={styles.itemSecondLast}>
                    <Text key={RandomInteger()} style={styles.text}>{item.ProductName}</Text>
                </View>
                <View  key={RandomInteger()} style={styles.itemLast}>
                    <Text key={RandomInteger()} style={styles.text}>{item.OnHandQty}</Text>
                </View>
            </View>
        </Card>
        
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Samples)