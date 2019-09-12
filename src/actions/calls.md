# Call Actions

[This](/src/actions/calls.js "JS file for calls actions") file contains all the actions related to call service and reducer handlers.

Below are the methods ([action creators](https://redux.js.org/basics/actions "Redux Documentation")) that are being used for call services.

## getCalls

This `action` will be called when the app requests to fetch the daily calls

```javascript
    {
        type: GET_CALLS,
    }
```

## getCallsSuccess:

This `action` will be called when the [above](#get-calls "getCalls Action") `action` results in successful response.

```javascript
    {
        type: GET_CALLS_SUCCESS,
        calls, // API response
    }
```

## getCallsFailure

This `action` will be called when the [getCalls](#get-calls "getCalls Action") `action` results in failure response.

```javascript
    {
        type: GET_CALLS_FAILURE,
        error: error // API error
    }
```

## submitCall

This `action` is responsible for the execution of daily call and will be fired when the execute call API initiated.

```javascript
    {
        type: SUBMIT_CALL,
        submit_data // request payload of call execution API
    }
```

## submitCallSuccess

This `action` will be called when [above](#submit-call "submitCall Action") action returns in a success response.

```javascript
    {
        type: SUBMIT_CALL_SUCCESS,
        submit_data // request payload of call execution API
    }
```

## submitCallFailure

This `action` will be called when [above](#submit-call "submitCall Action") action returns in a failure response.

```javascript
    {
        type: SUBMIT_CALL_FAILURE,
        error // Submit call API error
    }
```

## getUnplannedCalls

This `action` will be fired when unplanned call request initiated.

```javascript
    {
        type: GET_UNPLANNED_CALLS
    }
```

## getUnplannedCallsSuccess

This `action` will be called when [above](#get-unplanned-calls "getUnplannedCalls Action") action returns in a success response.

```javascript
    {
        type: GET_UNPLANNED_CALLS_SUCCESS,
        unplanned_calls, // API call response
    }
```

## getUnplannedCallsFailure

This `action` will be called when [above](#get-unplanned-calls "getUnplannedCalls Action") action returns in a failure response.

```javascript
    {
        type: GET_UNPLANNED_CALLS_FAILURE,
        error, // API call error
    }
```
