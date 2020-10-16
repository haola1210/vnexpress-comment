import { call, put, takeLatest, select } from 'redux-saga/effects'
// import Axios from 'axios'

import {  
    FETCH_CMT_START,
    FETCH_CMT_SUCCESS,
    FETCH_CMT_FAILURE,
    FETCH_COMMENT
} from '../redux/comment/actionType'

import {
    FETCH_AVATAR
} from '../redux/avatar/actionType'

import { fetch } from '../services/fetch'

export function* workerFetchComment(action){
    try {
        const { 
            postId,
            offset,
            limit
        } = action
        if(!postId) throw new Error('Vui lòng nhập id bài báo')
        const url = 
        `https://cors-anywhere.herokuapp.com/https://usi-saas.vnexpress.net/index/get?offset=${offset}&limit=${limit}&frommobile=0&sort=like&is_onload=0&objectid=${postId}&objecttype=1&siteid=1002565&categoryid=1002575&sign=bbff03fde3c3c8b6cb81aba598155af1`
        
        yield put({ type : FETCH_CMT_START, limit, offset })
        
        const res = yield call(fetch, url)
        yield put({
            type : FETCH_CMT_SUCCESS,
            payload : res.data.data.items, //payload
            totalQuantity : res.data.data.total,
            // currentQuantity :  res.data.data.total,
            postId
        })

        const state = yield select(state => state.comment)
        const usersId = state.comments.map(cmt => cmt.userid)
        //fetch all avatar one time
        yield put({
            type : FETCH_AVATAR,
            usersId
        })
        
    } catch (error) {
        
        yield put({
            type : FETCH_CMT_FAILURE,
            error : error.message
        })
        
    }
}

export function* watchFetchComment(){
    yield takeLatest(FETCH_COMMENT, workerFetchComment)
}