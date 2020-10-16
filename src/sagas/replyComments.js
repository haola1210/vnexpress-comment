import { call, put, takeEvery } from 'redux-saga/effects'

import {
    FETCH_REPLY_CMT_START,
    FETCH_REPLY_CMT_SUCCESS,
    FETCH_REPLY_CMT_FAILURE,
    FETCH_REPLY_COMMENT
} from '../redux/replyComment/actionType'

import {
    FETCH_AVATAR
} from '../redux/avatar/actionType'
                                                                                                                                        

import { fetch } from '../services/fetch'

//https://cors-anywhere.herokuapp.com/https://usi-saas.vnexpress.net/index/getreplay?siteid=1003750&objectid=4146737&objecttype=1&id=36460901&limit=12&offset=0

export function* workerFetchReplyCmt(action){
    const {
        postId,
        cmtParentId,
        offset
    } = action
    // console.log(action)
    try {
        // const thisReplyCmtState = yield select(state => state.replyComment[cmtParentId])
        // console.log( thisReplyCmtState)
       
        const url = `https://cors-anywhere.herokuapp.com/https://usi-saas.vnexpress.net/index/getreplay?siteid=1003750&objectid=${postId}&objecttype=1&id=${cmtParentId}&limit=12&offset=${offset}`
        // console.log(url)
        yield put({
            type : FETCH_REPLY_CMT_START,
            cmtParentId,
            offset
        })

        const res = yield call(fetch, url)
        const items = res.data.data.items
        yield put({
            type : FETCH_REPLY_CMT_SUCCESS,
            cmtParentId,
            payload : items
        })

        const usersId = items.map(cmt => cmt.userid)
        // console.log(usersId)
        yield put({
            type : FETCH_AVATAR,
            usersId
        })
        
    } catch (error) {
        yield put({
            type : FETCH_REPLY_CMT_FAILURE,
            cmtParentId,
            error: error.message
        })
    }
}

export function* watchFetchReplyCmt(){
    yield takeEvery(FETCH_REPLY_COMMENT, workerFetchReplyCmt)
}