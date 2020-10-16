import { call, put, takeEvery, all } from 'redux-saga/effects'
// import Axios from 'axios'

import {
    FETCH_AVATAR_START,
    FETCH_AVATAR_SUCCESS,
    FETCH_AVATAR_FAILURE,
    FETCH_AVATAR
} from '../redux/avatar/actionType'

import { fetch } from '../services/fetch'

export function* workerFetchAvatar(action){
    const { usersId } = action
    let url = `https://cors-anywhere.herokuapp.com/https://my.vnexpress.net/apifrontend/getusersprofile?`
    usersId.map(userId => {
        let query = `myvne_users_id[]=${userId}&`
        url += query
        return userId
    })
    // console.log(url)
    try {
        // console.log(userId)
        // const userState = yield select(state => state.avatar[userId])
        // console.log(userState)
        
        yield all(
            usersId.map(userId => put({
                type : FETCH_AVATAR_START,
                userId
            }))
        )

        const res = yield call(fetch, url)

        yield all(
            usersId.map(userId => put({
                type : FETCH_AVATAR_SUCCESS,
                url : res.data.arrUsers[userId] ? res.data.arrUsers[userId]['user_avatar'] : '',
                userId
            }))
        )

        // const url = 
        // yield put({ 
        //     type : FETCH_AVATAR_START,
        //     userId
        // })
        // const res = yield call(fetch, url)
        // // console.log("link"+res.data.arrUsers[userId]['user_avatar'])
        // yield put({
        //     type : FETCH_AVATAR_SUCCESS,
        //     url : res.data.arrUsers[userId]['user_avatar'],
        //     userId
        // })
       

    } catch (error) {
        console.log(error)
        yield all(
            usersId.map(userId => put({
                type : FETCH_AVATAR_FAILURE,
                error : error.message,
                userId
            }))
        )
        // yield put({
        //     type : FETCH_AVATAR_FAILURE,
        //     type : FETCH_AVATAR_FAILURE,
        //     userId
        // })
    }
}

export function* watchFetchAvatar(){
    yield takeEvery(FETCH_AVATAR, workerFetchAvatar)
}