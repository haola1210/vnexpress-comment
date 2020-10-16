import React, { useState } from 'react';
import { Avatar, Typography, Statistic, Input, Menu, Dropdown } from 'antd';
import { UserOutlined, LikeFilled, FacebookFilled, TwitterCircleFilled, LoadingOutlined} from '@ant-design/icons';
import { useSelector } from 'react-redux'

import { shortenContent } from '../../services/shortenContent'


import './Comment.scss'

const Comment = (props) => {

	const { 
		content,
		userName,
		time ,
		like,
		userId,
		style
	} = props

	const [isLike, setLike] = useState(false)
	const [isRep, setRep] = useState(false) 
	const [expand, setExpand] = useState(false)
	

	const state = useSelector(state => state.avatar[userId]) || {}


	const shareOption = (
		<Menu style={{width : 'fit-content', display : 'flex'}}>
			<Menu.Item key={0}>
				<FacebookFilled />
			</Menu.Item>
			<Menu.Item key={1}>
				<TwitterCircleFilled />
			</Menu.Item>
		</Menu>
	)

	return (
		<div className="comment" style={style} >
			<div className="comment__avatar">
				<Avatar
					size = { 40 }
					icon = { 
						state.isLoading ? 
						<LoadingOutlined /> :
						(state.error && <UserOutlined />)
					}
					src = { state.url && state.url}
				/>
			</div>

			<div className="comment__body">
				<div className="comment__body__content">
					<Typography >
						
						<Typography.Text strong style={{color: "#04416D", cursor: 'pointer'}}>
							{/* userName here ... replace this cmt with code */}
							{ userName }
						</Typography.Text>{" "}
						
						{/**less content */}
						{
						(!expand && content.split(' ').length > 100) && 
						<div style={{ display: "inline" }}>
							<span dangerouslySetInnerHTML={{
									__html: shortenContent(content, 100, '...' ) 
								}} 
							></span>
							<span 
								style = {{color: "#04416D", cursor: 'pointer'}}
								onClick={() => setExpand(!expand)}
							>xem thêm</span>
						</div>
						}
						{
							(expand || content.split(' ').length < 100 ) &&
							// * full content*
							<div style={{ display: "inline" }} dangerouslySetInnerHTML={{__html: content}} ></div>
						}
					</Typography>
				</div>
				<div className="comment__body__action">
					<div className="comment__body__action__group-left">

						{/* like  */}
						{/*{numberOfLikes v-here replace with code } */}
						<Statistic value={ like } 
							suffix={
								<LikeFilled 
									onClick={() => setLike(!isLike)}
									className="link-behavior"
								/>
							} 
							className={isLike && "liked"}
						/>
						
						{/* reply  */}
						<p className="link-behavior" onClick={() => setRep(!isRep)}>Trả lời</p>
						
						
								
						{/* share */}
						<Dropdown overlay={shareOption} trigger={['click']}>
							<p className="link-behavior">Chia sẻ</p>
						</Dropdown>

						<p>{ time }</p>
					</div>

					<div className="comment__body__action__group-right">
						<p className="link-behavior">Vi phạm</p>
					</div>

				</div>

				<div className="comment__body__reply" style={{display: isRep ? "block" : "none"}} >
					<Input placeholder="Ý kiến của bạn..."/>
				</div>

			</div>
		</div>

	)
}

export default Comment;
