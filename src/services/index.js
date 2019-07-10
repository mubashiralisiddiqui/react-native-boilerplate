import axios from 'axios';
import { baseURL, getToken } from '../constants'

export function getCalls() {
    console.log("base URL =>", `${baseURL}getTodayCalls`)
    // return fetch(`${baseURL}getTodayCalls?Token=Fahad&EmployeeId=1`).then(res => res.json())
    return axios.get(`${baseURL}getTodayCalls`, {
        params: {
            Token: getToken,
            EmployeeId: 1,
        }
    }).then(response => JSON.parse(response.data.d))
    .catch(console.log)
}