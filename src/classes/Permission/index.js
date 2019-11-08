import { PermissionsAndroid } from 'react-native'

export default class Permissions {
    static async requestCameraAccess() {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Hudson Pharma',
              message: 'Hudson Pharma needs access to your camera ',
            },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    static async requestLocationAccess() {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Hudson Pharma',
              message: 'Hudson Pharma needs access to your location.'
            }
        )

        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    static async requestStorageAccess() {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Hudson Pharma',
              message: 'Hudson Pharma needs access to your device storage.'
            }
        )

        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    static async requestWriteStorageAccess() {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Hudson Pharma',
              message: 'Hudson Pharma needs write access to your device storage.'
            }
        )

        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    static requestAll() {
        PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.CAMERA,
        ])
    }

    static async checkStorageAccess() {
        const permitted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        return permitted;
    }
}