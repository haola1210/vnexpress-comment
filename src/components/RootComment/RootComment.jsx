import React from 'react';
import { EnterOutlined } from '@ant-design/icons'
import { Spin, Alert, Button } from 'antd'

import { useSelector, useDispatch } from 'react-redux'

import Comment from '../Comment/Comment'
import { FETCH_REPLY_COMMENT } from '../../redux/replyComment/actionType'

const RootComment = (props) => {
    
    const { data } = props
    // const numRep = data.numRep || 0
    // const [showRep, setShowRep] = useState(false)
    // const [listRep, setListRep] = useState([])

    const {
        content,
        'full_name' : userName,
        time,
        userlike : like,
        replys : {total : numRep},
        userid : userId,
        'comment_id' :  commentId,
        'article_id' : postId
    } = data

    const state = useSelector(state => state.replyComment[commentId]) || {}
    const dispatch = useDispatch()

    const fetchReply = (cmtParentId, postId, offset = 0) => {
        //
        // setShowRep(!showRep)
        // console.log('clicked')
        dispatch({
            type : FETCH_REPLY_COMMENT,
            cmtParentId,
            postId,
            offset
        })
    }

    // useEffect(() => console.log(state))
   

    return (
        <div style={{margin : "15px 0"}}>

            <Comment 
                content = { content }
                userName = { userName }
                time = { time }
                like = { like }
                numRep = { numRep }
                userId = { userId }
            />
            <div style={{ marginLeft : "50px" }}>   
                
                {
                    ( !state.comments && numRep ) && 
                    (<div onClick={() => fetchReply(Number(commentId), postId)} style={{fontWeight: "bold", color: '#076DB6', cursor : "pointer"}}>
                        <EnterOutlined style={{transform: "rotateY(180deg)"}}/> {` ${numRep} trả lời`}
                    </div>)
                }
                
                {
                    state.comments && 
                    (<div style={{minHeight : "50px"}}>
                       

                        {
                            state.error && 
                            <Alert 
                                message = "Có lỗi xảy ra"
                                description = {state.error}
                                closable
                                type = "error"
                            />
                        }

                        {
                            state.comments.length > 0 &&
                            <div style={{borderLeft : "2px solid #0000001f", paddingLeft: "5px"}}>
                                {
                                    state
                                    .comments
                                    .map((comment, index) => {
                                        const {
                                            content,
                                            'full_name' : userName,
                                            time,
                                            userlike : like,
                                            userid : userId,
                                            'comment_id' : commentId
                                        } = comment
                                        return (<Comment style={{margin : "15px 0"}}
                                            key={ commentId }
                                            content = { content }
                                            userName = { userName }
                                            time = { time }
                                            like = { like }
                                            userId = { userId }
                                        />)
                                    })
                                }
                            </div>
                        }

                            {/* loading  */}
                        {
                            state.isLoading && <Spin size="small"/>
                        }

                            {/* show more reply  */}
                        {
                            (!state.isLoading && (numRep > state.offset)) && <Button onClick={() => fetchReply(Number(commentId), postId, state.offset)}>Xem thêm</Button>

                        }
                    </div>)
                }

            </div>
        </div>
    );
}

export default RootComment;
