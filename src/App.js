import React from 'react';



import { useSelector, useDispatch } from 'react-redux'
import './App.css';

import RootComment from './components/RootComment/RootComment'
import { Row, Col, Input, Spin, Alert, Button } from 'antd';

import { FETCH_COMMENT } from './redux/comment/actionType'

function App() {

  // const [comments, setComments] = useState([])
  const state = useSelector(state => state.comment)
  const dispatch = useDispatch()

  const fetchComment = (value, limit = 15, offset = 0) => {
    // console.log(value)
    dispatch({ 
      type :  FETCH_COMMENT,
      postId : value,
      limit,
      offset
    })
  }

  // useEffect(() => console.log(state))

  return (
   
      <div className="App">
        <Row>
          <Col span={24}>
            <Input.Search 
              placeholder="Nhập post id"
              enterButton="Tìm"
              onSearch={value => fetchComment(value)}
            />
          </Col>
        </Row>
        <Row>
          <Col style={{padding: "0 10px"}} span={24}>
            
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
              state.comments.map(comment => {
                return (
                  <RootComment key={comment[`comment_id`]} data={comment} />
                )
              })
            }

              {/**loading at last for first load and load more process */}
            {
              state.isLoading && <Spin size="large" />
            }
            

              {/**load more section */}
            {
              (!state.isLoading && (state.totalQuantity > state.offset)) &&
              <Button block
                type="primary" style={{margin: 'auto'}}
                onClick = {() => fetchComment(state.postId, 15, state.offset)}
              >Xem thêm</Button>
            }
          </Col>
        </Row>
      </div>
  );
}

export default App;
