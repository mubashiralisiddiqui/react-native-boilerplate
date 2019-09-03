import Permissions from "../Permission";
import store from '../../../store';
import { getLocation, getLocationSuccess, getLocationFailure } from "../../actions/location";
import { getLocationError } from "../../reducers/locationReducer";

export default class Location {
    static lat;
    static long;

    static watchID
    
    static setLat(lat) {
        this.lat = lat
    }
    
    static setLong(long) {
        this.long = long
    }

    static getCoords() {
        return { lat: this.lat, long: this.long }
    }

    static callLocation(dispatch){
        dispatch(getLocation())
        navigator.geolocation.getCurrentPosition(
        //Will give you the current location
            (position) => {
                this.setLong(JSON.stringify(position.coords.longitude));
                //getting the Longitude from the location json
                this.setLat(JSON.stringify(position.coords.latitude));
                dispatch(getLocationSuccess(this.getCoords()))
                },
                (error) => {
                    dispatch(getLocationFailure(error))
                    console.log(error, this.getCoords())
                },
                { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            this.setLong(JSON.stringify(position.coords.longitude));
            //getting the Longitude from the location json
            this.setLat(JSON.stringify(position.coords.latitude));
            dispatch(getLocationSuccess(this.getCoords()))
        });
    }

    static async requestLocation(dispatch) {
        const granted = await Permissions.requestLocationAccess()
            granted === true
            ? this.callLocation(dispatch)
            : alert('You cannot process your calls without this persmission.')
    }

    static stopLocating() {
        console.log(234)
        navigator.geolocation.clearWatch(this.watchID);
    }
}