import React from 'react'
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import Material from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import Entypo from 'react-native-vector-icons/Entypo'
import Evil from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RandomInteger } from '../../constants'

export const MaterialCommunityIcon = (props) => <MaterialCommunity key={`${RandomInteger()}`} {...props} />

export const MaterialIcon = (props) => <Material key={`${RandomInteger()}`} {...props}/>

export const FontAwesomeIcon = (props) => <FontAwesome key={`${RandomInteger()}`} {...props}/>

export const FontAwesome5Icon = (props) => <FontAwesome5 key={`${RandomInteger()}`} {...props}/>

export const FontAwesome5ProIcon = (props) => <FontAwesome5Pro key={`${RandomInteger()}`} {...props}/>

export const EntypoIcon = (props) => <Entypo key={`${RandomInteger()}`} {...props}/>

export const EvilIcon = (props) => <Evil key={`${RandomInteger()}`} {...props}/>

export const AntDesignIcon = (props) => <AntDesign key={`${RandomInteger()}`} {...props}/>

