import {
    FETCH_REPLY_CMT_START,
    FETCH_REPLY_CMT_SUCCESS,
    FETCH_REPLY_CMT_FAILURE
} from './actionType'

const initialState = { }

/**
 * state = {
 *  'commentParentId' : {
 *      isloading,
 *      error,
 *      comments : [],
 *      offset : 0
 *  }
 * }
 */

export const reducer = (state = initialState, action) => {
    const { cmtParentId, offset, error } = action
    switch(action.type){
        case FETCH_REPLY_CMT_START:
            let currentCmts = state[cmtParentId] === undefined ? [] : state[cmtParentId].comments
            return {
                ...state,
                [cmtParentId] : {
                    ...state[cmtParentId],
                    isLoading : true,
                    comments : currentCmts,
                    error : '',
                    offset
                }
            }
        
            case FETCH_REPLY_CMT_SUCCESS:
                return {
                    ...state,
                    [cmtParentId] : {
                        ...state[cmtParentId],
                        isLoading : false,
                        comments : state[cmtParentId].comments.concat(action.payload),
                        offset : state[cmtParentId].offset + 12
                    }
                }
            
            case FETCH_REPLY_CMT_FAILURE:
                return {
                    ...state,
                    [cmtParentId] : {
                        ...state[cmtParentId],
                        isLoading : false,
                        error
                    }
                }

        default : return state
    }
}