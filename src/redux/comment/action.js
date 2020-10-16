import {
    FETCH_CMT_START,
    FETCH_CMT_SUCCESS,
    FETCH_CMT_FAILURE
} from './actionType'

export const fetchCmtStart = () => {
    return {
        type : FETCH_CMT_START
    }
}

export const fecthCmtSuccess = data => {
    return {
        type : FETCH_CMT_SUCCESS,
        payload : data
    }
}

export const fetchCmtFailure = err => {
    return {
        type : FETCH_CMT_FAILURE,
        error : err
    }
}