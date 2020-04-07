import { post, get } from "../../constants";
import DropDownHolder from "../../classes/Dropdown";
import { alertData } from "../../constants/messages";

export function getDecliningCONSGOutlets(params) {
    get(params)
    .then(response => {

    })
    .catch(console.log)
}

export function submitReview(params) {
    post({params})
    .then(response => {
        DropDownHolder.show(alertData.CONSGReviews.reviewSuccess)
    })
    .catch(error => {
        DropDownHolder.show(alertData.CONSGReviews.reviewFailure)
    })
}