import {
    FETCH_REPLY_CMT_START,
    FETCH_REPLY_CMT_SUCCESS,
    FETCH_REPLY_CMT_FAILURE
} from './actionType'

export const fetchReplyCmtStart = () => {
    return {
        type : FETCH_REPLY_CMT_START
    }
}

export const fecthReplyCmtSuccess = data => {
    return {
        type : FETCH_REPLY_CMT_SUCCESS,
        payload : data
    }
}

export const fetchReplyCmtFailure = error => {
    return {
        type : FETCH_REPLY_CMT_FAILURE,
        error 
    }
}