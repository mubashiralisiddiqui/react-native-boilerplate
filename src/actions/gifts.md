# Gifts Actions

This file contains all the action being used with gifts API.

## getGifts

When the request for getting gift items initiated this `action` will be triggered.

```javascript
    {
        type: GET_GIFTS,
    }
```

## getGiftsSuccess

This `action` will be triggered when the [above](#get-gifts-success "getGifts Action") results in a success response.

```javascript
    {
        type: GET_GIFTS_SUCCESS,
        gifts, // API response
    }
```

## getGiftsFailure

This `action` will be triggered when the [above](#get-gifts-success "getGifts Action") results in a failed response.

```javascript
    {
        type: GET_GIFTS_FAILURE,
        error, // API error
    }
```
