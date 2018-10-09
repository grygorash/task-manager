import React, { Fragment } from 'react';
import { Col } from 'reactstrap';
import { withRouter } from 'react-router';
import moment from 'moment';

const Header = props => {
		const {selectedBoard, developers} = props;
		return (
			<Fragment>
				<Col
					md="6"
					className="border-info">
					<p>Title: <span>{selectedBoard.boardTitle}</span></p>
					<p>Start Date: <span>{moment(selectedBoard.startDate).format('MMM Do YYYY')}</span></p>
					<p>End Date: <span>{selectedBoard.endDate ? moment(selectedBoard.endDate).format('MMM Do YYYY') : '-'}</span>
					</p>
				</Col>
				<Col
					md="6"
					className="create">
					<button
						className={selectedBoard.status === 'closed' ? 'd-none' : 'btn'}
						style={developers.length ? {marginRight: '20px'} : null}
						onClick={() => props.history.push(`/board/${selectedBoard.id}/create-developer`)}>
						Invite <span>Developer</span>
					</button>
					{developers.length ? (
						<button
							className={selectedBoard.status === 'closed' ? 'd-none' : 'btn'}
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