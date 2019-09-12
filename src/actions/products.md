# Products Actions

[This](/src/actions/products.js "JS file for Products Actions") file has all the actions related to products services.

## getProducts

This `action` will be triggered when the app starts fetching products from the server.

```javascript
    {
        type: GET_PRODUCTS,
    }
```

## getProductsSuccess

This `action` will be triggered when the [above](#get-products "getProducts Action") action results in a successful response.

```javascript
    {
        type: GET_PRODUCTS_SUCCESS,
        products, // API response
    }
```

## getProductsFailure

This `action` will be triggered when the [above](#get-products "getProducts Action") action results in a failed response.

```javascript
    {
        type: GET_PRODUCTS_SUCCESS,
        error, // API error
    }
```
