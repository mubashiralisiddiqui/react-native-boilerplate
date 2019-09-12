import {
    parse,
    Axios,
} from '../constants';
import * as authService from "./auth";
import * as callService from "./callServices";
import * as productService from "./productService";
import * as giftService from "./giftService";
import * as historyService from "./historyService";
import { captureScreen } from "react-native-view-shot";
import { CameraRoll } from 'react-native'
import DropDownHolder from '../classes/Dropdown';

export const responseInterceptor = response => {
    response = parse(response.data && response.data.d)
    if(response.Error !== undefined) {
        DropDownHolder.show({type: 'error', title: 'Server Error Occurred', message: `${response.Error}, the screenshot of the error has been taken and saved to your Photos. Please contact IT support.`})
        // alert(`${response.Error}, Please contact IT support.`)
        setTimeout(() => captureScreen({
            format: "jpg",
            quality: 0.8
        }).then(
            uri => console.log("Image saved to", uri) || CameraRoll.saveToCameraRoll(uri),
            error => console.error("Oops, snapshot failed", error)
        ), 1500)
        // captureScreen({
        //     format: "jpg",
        //     quality: 0.8
        // }).then(
        //     uri => console.log("Image saved to", uri) || CameraRoll.saveToCameraRoll(uri),
        //     error => console.error("Oops, snapshot failed", error)
        // );
        return null
    }
    return response
}

export const errorInterceptor = error => {
    return error
}

export const services = () => {
    if(Axios.interceptors.response.handlers.length == 0) {
        Axios.interceptors.response.use(responseInterceptor);
    }
    return {
        callService,
        productService,
        authService,
        giftService,
        historyService
    }
}