import React, { Fragment } from 'react';
import { Col } from 'reactstrap';
import { withRouter } from 'react-router';

const Header = props => {
		const {selectedBoard, developers} = props;
		return (
			<Fragment>
				<Col md="6" className="border-info">
					<p>Title: <span>{selectedBoard.boardTitle}</span></p>
					<p>Created Date: <span>{selectedBoard.createDate}</span></p>
				</Col>
				<Col md="6" className="create">
					<button className="btn"
					        style={developers.length ? {marginRight: '20px'} : null}
					        onClick={() => props.history.push(`/board/${selectedBoard.id}/create-developer`)}>
						Invite <span>Developer</span>
					</button>
					{developers.length ? (
						<button className="btn"
						        onClick={() => props.history.push(`/board/${selectedBoard.id}/create-task`)}>
							Create <span>Task</span>
						</button>
					) : null}
				</Col>
			</Fragment>
		);
	}
;

export default withRouter(Header);