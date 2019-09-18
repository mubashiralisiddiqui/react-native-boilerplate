# Doctor Actions

This module uses multiple types from `types` [file](/src/actions/types.js "Application's Types file").

* GET_DOCTOR_DESIGNATION
* GET_DOCTOR_DESIGNATION_FAILURE
* GET_DOCTOR_DESIGNATION_SUCCESS
* GET_DOCTOR_SPECIALITY
* GET_DOCTOR_SPECIALITY_FAILURE
* GET_DOCTOR_SPECIALITY_SUCCESS
* SUBMIT_DOCTOR_REQUEST
* SUBMIT_DOCTOR_REQUEST_FAILURE
* SUBMIT_DOCTOR_REQUEST_SUCCESS
* GET_DOCTORS_BY_EMPLOYEE
* GET_DOCTORS_BY_EMPLOYEE_SUCCESS
* GET_DOCTORS_BY_EMPLOYEE_FAILURE
* SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST
* SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST_FAILURE
* SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST_SUCCESS
* GET_CALLS_DOCTORS
* GET_UNPLANNED_CALLS_DOCTORS

## getDesignations

This `action` triggers when the app starts to fetch the designatiosn from designations API.

```javascript
    {
        type: GET_DOCTOR_DESIGNATION,
    }
```

## getDesignationsSuccess

This `action` triggers when the [getDesignations](#getDesignations "getDesignations Action") results in a successful response.

```javascript
    {
        type: GET_DOCTOR_DESIGNATION_SUCCESS,
        designations,
    }
```

## getDesignationsFailure

This `action` triggers when the [getDesignations](#getDesignations "getDesignations Action") results in a failed response.

```javascript
    {
        type: GET_DOCTOR_DESIGNATION_FAILURE,
        error,
    }
```

## getSpecialities

This `action` triggers when the app starts to fetch the doctor's specialities from specialities API.

```javascript
    {
        type: GET_DOCTOR_SPECIALITY,
    }
```

## getSpecialitiesSuccess

This `action` triggers when the [getSpecialities](#getSpecialities "getSpecialities Action") results in a successful response.

```javascript
    {
        type: GET_DOCTOR_SPECIALITY_SUCCESS,
        specialities,
    }
```

## getSpecialitiesFailure

This `action` triggers when the [getSpecialities](#getSpecialities "getSpecialities Action") results in a failed response.

```javascript
    {
        type: GET_DOCTOR_SPECIALITY_FAILURE,
        error,
    }
```

## submitDoctorRequest

This `action` will be triggered when user submits the new doctor request form.

```javascript
    {
        type: SUBMIT_DOCTOR_REQUEST,
    }
```

## submitDoctorRequestSuccess

This `action` triggers when the [submitDoctorRequest](#submitDoctorRequest "submitDoctorRequest Action") results in a successful response.

```javascript
    {
        type: SUBMIT_DOCTOR_REQUEST_SUCCESS,
        request,
    }
```

## submitDoctorRequestFailure

This `action` triggers when the [submitDoctorRequest](#submitDoctorRequest "submitDoctorRequest Action") results in a failed response.

```javascript
    {
        type: SUBMIT_DOCTOR_REQUEST_FAILURE,
        error,
    }
```

## getDoctorsByEmployee

This `action` will be triggers when app tries to get doctors for specific employee.

```javascript
    {
        type: GET_DOCTORS_BY_EMPLOYEE,
    }
```

## getDoctorsByEmployeeSuccess

This `action` triggers when the [getDoctorsByEmployee](#getDoctorsByEmployee "getDoctorsByEmployee Action") results in a successful response.

```javascript
    {
        type: GET_DOCTORS_BY_EMPLOYEE_SUCCESS,
        doctors,
    }
```

## getDoctorsByEmployeeFailure

This `action` triggers when the [getDoctorsByEmployee](#getDoctorsByEmployee "getDoctorsByEmployee Action") results in a successful response.

```javascript
    {
        type: GET_DOCTORS_BY_EMPLOYEE_FAILURE,
        error,
    }
```

## submitDoctorChangeLocationRequest

This `action` will be triggered when the user initiate the change doctor location request.

```javascript
    {
        type: GET_UNPLANNED_CALLS_DOCTORS,
        doctors,
    }
```

## submitDoctorChangeLocationRequestSuccess

This `action` triggers when the [submitDoctorChangeLocationRequest](#submitDoctorChangeLocationRequest "submitDoctorChangeLocationRequest Action") results in a successful response.

```javascript
    {
        type: SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST_SUCCESS,
    }
```

## submitDoctorChangeLocationRequestFailure

This `action` triggers when the [submitDoctorChangeLocationRequest](#submitDoctorChangeLocationRequest "submitDoctorChangeLocationRequest Action") results in a successful response.

```javascript
    {
        type: SUBMIT_CHANGE_DOCTOR_LOCATION_REQUEST_FAILURE,
    }
```

## getCallsDoctors

This `action` will be triggered when getDailyCalls(#getDailyCalls "getDailyCalls Action") results in a successful response. It is responsible to make sure that the store gets the doctors information from the calls.

```javascript
    {
        type: GET_CALLS_DOCTORS,
        doctors,
    }
```

## getUnplannedCallsDoctors

This `action` will be triggered when [getUnplannedDailyCalls](#getUnplannedDailyCalls "getUnplannedDailyCalls Action") results in a successful response. It is responsible to make sure that the store gets the doctors information from the calls.

```javascript
    {
        type: GET_UNPLANNED_CALLS_DOCTORS,
        doctors,
    }
```
