# City Actions

This module uses 3 action types (`GET_CITIES`, `GET_CITIES_SUCCESS`, `GET_CITIES_FAILURE`) from `types` [file](/src/actions/types.js "Types File").

## getCities

This `action` will be triggered when the API request gets initiated.

```javascript
    {
        type: GET_CITIES
    }
```

## getCitiesSuccess

This `action` will be triggered when [above](#getcities "getcities Action") action results in a successful response.

```javascript
    {
        type: GET_CITIES_SUCCESS,
        cities, // array containing cities data
    }
```

## getCitiesFailure

This `action` will be triggered when [above](#getcities "getcities Action") action results in a failed response.

```javascript
    {
        type: GET_CITIES_FAILURE,
        error, // API error
    }
```
