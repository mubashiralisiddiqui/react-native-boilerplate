import React, { PureComponent } from 'react'
import { View, Dimensions, ScrollView } from 'react-native';
import { ImageBackgroundWrapper } from '../../components';
import { CallPlanHeader } from '../../components/Headers';
import { navigationOption, RandomInteger, brandColors, RFValue } from '../../constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getSamples, getProducts } from '../../reducers/productsReducer';
import { Text, Card } from 'react-native-elements';
import { NetworkContext } from '../../components/NetworkProvider';

class Samples extends PureComponent {
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Samples'))
    static contextType = NetworkContext

    state = {
        width: Dimensions.get('screen').width,
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
                    <ScrollView contentContainerStyle={{ width: '100%', display: 'flex',
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
                            this.props.samples.map(sample => (
                                    <_render key={RandomInteger()} item={sample} />
                                )
                            )
                        }
                    </ScrollView>
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
        products: getProducts(state),
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
            justifyContent: 'flex-start',
            flexDirection: 'row',
            width: '100%',
            height: 15,
            paddingLeft: 0,
            backgroundColor: 'transparent'
        },
        itemHead: {
            height: 15,
            justifyContent: 'center',
            width: '50%'
        },
        itemHeadIcon: {
            height: 15,
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '50%'
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
        textHead: {
            fontSize: RFValue(16),
            fontFamily: 'Lato-MediumItalic',
            color: brandColors.lightGreen,
            textAlign: 'left',
        },
        text: {
            fontSize: RFValue(16),
            fontFamily: 'Lato-MediumItalic',
            color: brandColors.darkBrown,
        },
        cardContainer: {
            backgroundColor: brandColors.darkBrown,
            shadowColor: brandColors.lightGreen,
            borderRadius: 10,
            // shadowOffset: { width: 0, height: 4 },
            // shadowOpacity: 0.8,
            // shadowRadius: 4,
            width: '70%',
            justifyContent: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            elevation: 0,
            borderColor: brandColors.lightGreen,
            borderWidth: 1
        },
        listCardContainer: {
            backgroundColor: 'transparent',
            borderColor: brandColors.lightGreen,
            shadowColor: brandColors.darkBrown,
            borderRadius: 10,
            width: '70%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 0,
            borderColor: brandColors.lightGreen,
        }
    }
}

_render = ({ item }) => {
    const styles = getStyles()
    return (
        <Card key={`${item.ProductId}${RandomInteger()}`}
            containerStyle={styles.listCardContainer}
        >
            <View onLayout={this.onLayout} key={`${item.ProductId}${RandomInteger()}`} style={styles.viewContainer}> 
                <View key={`${item.ProductId}${RandomInteger()}`} style={styles.itemSecondLast}>
                    <Text key={`${item.ProductId}${RandomInteger()}`} style={styles.text}>{item.ProductName}</Text>
                </View>
                <View  key={`${item.ProductId}${RandomInteger()}`} style={styles.itemLast}>
                    <Text key={`${item.ProductId}${RandomInteger()}`} style={styles.text}>{item.OnHandQty}</Text>
                </View>
            </View>
        </Card>
        
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Samples)