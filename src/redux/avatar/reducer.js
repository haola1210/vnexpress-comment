import {
    FETCH_AVATAR_START,
    FETCH_AVATAR_SUCCESS,
    FETCH_AVATAR_FAILURE
} from './actionType'

const initialState = {  }

// const state = {    /*style of state */
//     'userId' : {
//         url : '',
//         isLoading : false,
//         error : ''
//     }
// }

export const reducer = (state = initialState, action) => {
    const { userId } = action
    switch (action.type) {
        case FETCH_AVATAR_START:
            return {
                ...state,
                [userId] : {
                    ...state[userId],
                    isLoading : true
                }
            }
        
        case FETCH_AVATAR_SUCCESS:
            return {
                ...state,
                [userId] : {
                    ...state[userId],
                    isLoading : false,
                    url : action.url
                }
            }
        
        case FETCH_AVATAR_FAILURE:
            return {
                ...state,
                [userId] : {
                    ...state[userId],
                    isLoading : false,
                    error : action.error
                }
            }

        default:
            return state
    }
}