import React, { Component } from 'react'
import { getStorage, parse, navigationOption } from '../../constants';
import { View, ScrollView, FlatList } from 'react-native';
import { ImageBackgroundWrapper } from '../../components';
import { CallPlanHeader } from '../../components/Headers';
import { ListItem } from 'react-native-elements';

export default class SavedData extends Component {
    state = {
        calls: [],

    }
    static navigationOptions = ({ navigation }) => (navigationOption(navigation, 'Saved Data'))

    async componentDidMount() {
        let data = await getStorage('offlineCalls')
        // console.log(data)
        if(parse(data) !== 'null') {
            this.setState({
                calls: parse(data)
            })
        }

    }
    renderCallItem = ({item}) => {
        return (
            <ListItem
                title={item.call_execution_date || ''} 
                containerStyle={{backgroundColor: 'transparent'}}
                bottomDivider
            />
        )
    }
    render() {
        return (
            <View style={styles.InputContainer}>
                <ImageBackgroundWrapper>
                    <CallPlanHeader />
                    <FlatList
                        data={this.state.calls}
                        contentContainerStyle={{backgroundColor: 'transparent', width: '95%'}}
                        renderItem={this.renderCallItem} 
                    />
                </ImageBackgroundWrapper>
            </View>
        )
    }
}

const styles = {
    InputContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#f1eee9',
        justifyContent: 'center'
    }

}