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
            message: 'Phone number already exists.',
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
    },
    media: {
        type: 'info',
        title: 'Download Inprogress',
        message: 'Your e-detailing files are being downloaded, it will be available as soon as the download gets completed.',
    }

}