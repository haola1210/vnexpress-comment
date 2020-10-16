import { 
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux'
import createSagaMiddleware from 'redux-saga'


import { reducer as commentReducer } from './comment/reducer'
import { reducer as avatarReducer } from './avatar/reducer'
import { reducer as replyCommentReducer } from './replyComment/reducer'



import rootSaga from '../sagas/rootSaga'




const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    comment : commentReducer,
    avatar : avatarReducer,
    replyComment : replyCommentReducer
})

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

export default store