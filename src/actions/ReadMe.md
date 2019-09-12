# Redux Action Creators

This folder contains all the redux actions for each module.  
As par the redux action creator rule, any action object must contain the `type` key.

```javascript
// Example action object
{
    type: 'SUCCESS',
    // ...any other data you want to pass
}
```

These actions consist of 8 sections with respect to API calls. Please click on each section to see the action descriptions in detail.

1. [Auth](/src/actions/auth.md) Actions
2. [Call](/src/actions/calls.md) Actions
3. [Products](/src/actions/products.md) Actions
4. [City](/src/actions/city.md) Actions
5. [Doctor](/src/actions/doctor.md) Actions
6. [History](/src/actions/history.md) Actions
7. [Location](/src/actions/location.md) Actions
8. [Gift](/src/actions/gift.md) Actions

All the future action requests should be in its subsequent file.

To manage all the action `types`, we are using a single file that have all the exportable `constants`.

## Types

All the types are define [here](/src/actions/types.js), this way it will be easier to manage the action types the change will be happening at a single place.
