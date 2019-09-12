# Location Actions

[This](/src/actions/location.js "Location action JS file") will contain all the actions related to geolocation fetching services this application uses.

## getLocation

This `action` will be triggered whenever the application starts fetching the geolocation of the device.

```javascript
    {
        type: GET_CURRENT_LOCATION,
    }
```

## getLocationSuccess

This `action` will be triggered whenever the application successfully fetched the geolocation of the device.

```javascript
    {
        type: GET_CURRENT_LOCATION_SUCCESS,
        coords,
    }
```

## getLocationFailure

This `action` will be triggered whenever the application starts fetching the geolocation of the device.

```javascript
    {
        type: GET_CURRENT_LOCATION_FAILURE,
        error,
    }
```
