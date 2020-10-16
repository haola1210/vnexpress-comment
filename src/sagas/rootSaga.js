import { all } from 'redux-saga/effects'

import { watchFetchComment } from './commentSagas'
import { watchFetchAvatar } from './avatarSagas'
import { watchFetchReplyCmt } from './replyComments'

export default function* rootSaga(){
    yield all([
        watchFetchComment(),
        watchFetchReplyCmt(),
        watchFetchAvatar()
    ])
}