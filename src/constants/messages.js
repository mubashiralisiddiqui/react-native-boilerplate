export const alertData = {
    connectivity: {
        unavailable: {
            type: 'error',
            title: 'No Internet',
            message: 'We have lost the internet connection, you still can use the application with limited features',
        },
        limited: {
            type: 'warn',
            title: 'Limited Connectivity',
            message: 'Your connection seems to have lost the internet, make sure you are connected to a working internet.'
        },
    },
    doctor: {
        locationSuccess: {
            type: 'success',
            title: 'Request Submitted Successfully',
            message: 'Your request to change location has been submitted successfully',
        },
        doctorRequestSuccess: {
            type: 'success',
            title: 'Request Submitted Successfully',
            message: 'Your request to create new doctor has been created successfully',
        },
        doctorRequestFailure: {
            type: 'error',
            title: 'Request Failed',
            message: 'Phone number or email address already exists.',
        },
    },
    call: {
        onlineSuccess: {
            type: 'success',
            title: 'Call Executed Successfully',
            message: 'Call Executed and synced with the system successfully',
        },
        offlineSuccess: {
            type: 'success',
            title: 'Offline Call Executed Successfully',
            message: 'Offline Call Executed. It will be synced with the server once the device gets a working internet connection.',
        },
        onlineUnplannedSuccess: {
            type: 'success',
            title: 'Unplanned Call Executed Successfully',
            message: 'Unplanned call Executed and synced with the system successfully.',
        },
        offlineUnplannedSuccess: {
            type: 'success',
            title: 'Unplanned Call Executed Offline Successfully',
            message: 'Unplanned call Executed offline. It will be displayed once yor device gets a working internet.',
        },
        syncing: {
            type: 'info',
            title: 'Calls Syncing has been initialised',
            message: 'Calls syncing has been initialized, it can take a while to complete.',
        },
        synced: {
            type: 'success',
            title: 'Calls syncing completed',
            message: 'All calls have been synced successfully.',
        },
        noCalls: {
            type: 'info',
            title: 'No Daily Calls',
            message: 'No daily calls found for today'
        }
    },
    media: {
        type: 'info',
        title: 'Download Inprogress',
        message: 'Your e-detailing files are being downloaded, it will be available as soon as the download gets completed.',
    },
    refresh: {
        init: {
            type: 'info',
            title: 'Refreshing the data',
            message: 'Data refreshing has been initialised. It will take few moments to complete.',
        },
        success: {
            type: 'success',
            title: 'Successfully Refreshed',
            message: 'All the data has been refreshed and now up to date. Please contact IT support if you face any problems.',
        }
    }

}