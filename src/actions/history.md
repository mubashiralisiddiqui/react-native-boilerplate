# History Actions

[This](/src/action/history.js "Action file containing all the actions") file will contain all the actions related to `history` services.

## getHistory

This `action` will be triggered when the API request for getting doctor history is initiated.

```javascript
    {
        type: GET_HISTORY
    }
```

## getHistorySuccess

This `action` will be triggered when the [above](#get-history "getHistory Action") action results in a success response.

```javascript
    {
        type: GET_HISTORY_SUCCESS,
        history,
    }
```

## getHistoryFailure

This `action` will be triggered when the [above](#get-history "getHistory Action") action results in a failed response.

```javascript
    {
        type: GET_HISTORY_FAILURE
    }
```
