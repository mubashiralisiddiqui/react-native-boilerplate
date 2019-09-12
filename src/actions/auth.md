# Authentication Actions

[This](/src/actions/auth.js) file contains all the `actions` related to authentication calls and handlers.

* login:

This `action` will be clicked when the login process has been initialized.

```javascript
{
    type: LOGIN, // type is from types.js
}
```

* loginSuccess:

This `action` will be called when `API call` successfully returns the login response with `user's` object.

```javascript
{
    {
        type: LOGIN_SUCCESS, // login success type
        user, // user's data coming from API
    }
}
```

* loginFailure:

This `action` will be called when the `API call` returns the failed login response.

```javascript
{
    {
        type: LOGIN_FAILURE, // login failure type
        error, // login error
    }
}
```

* getReportingEmployees:
This `action` will be called when application is requesting the server to fetch reporting employees under each RSM.

```javascript
{
    type: GET_REPORTING_EMPLOYEES,
}
```

* getReportingEmployeesSuccess

This `action` will be called when API call returns success data.

```javascript
{
    type: GET_REPORTING_EMPLOYEES_SUCCESS,
    employees, // success data
}
```

* getReportingEmployeesFailure
This `action` will be called when the reporting employees API returns a failure response.

```javascript
    return {
        type: GET_REPORTING_EMPLOYEES_FAILURE,
        error, // API error
    }
```

