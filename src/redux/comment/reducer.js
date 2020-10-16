import { 
    FETCH_CMT_START,
    FETCH_CMT_SUCCESS,
    FETCH_CMT_FAILURE
 } from './actionType'

const initialState = {
    comments : [],
    isLoading : false,
    error : '',
    totalQuantity : 0,
    // currentQuantity : 0,
    limit : 0,
    offset : 0,
    postId : ''
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_CMT_START : 
            return {
                ...state,
                isLoading : true,
                limit : action.limit,
                offset : action.offset,
                error : '',
                comments : action.offset === 0 ? [] : state.comments
            }
        case FETCH_CMT_SUCCESS :
            return {
                ...state,
                isLoading : false,
                comments : state.comments.concat(action.payload),
                totalQuantity : action.totalQuantity,
                // currentQuantity : action.currentQuantity,
                offset : state.offset + state.limit,
                postId : action.postId
            }
        case FETCH_CMT_FAILURE : 
            return {
                ...state,
                isLoading : false,
                error : action.error
            }   
        default: 
            return state
    }
}