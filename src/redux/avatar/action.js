import {
    FETCH_AVATAR_START,
    FETCH_AVATAR_SUCCESS,
    FETCH_AVATAR_FAILURE
} from './actionType'

export const fetchAvtStart = () => {
    return {
        type : FETCH_AVATAR_START
    }
}

export const fetchAvtSuccess = url => {
    return {
        type : FETCH_AVATAR_SUCCESS,
        url
    }
}

export const fetchAvtFailure = error => {
    return {
        type : FETCH_AVATAR_FAILURE,
        error
    }
}