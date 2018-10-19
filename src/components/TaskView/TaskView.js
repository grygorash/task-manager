import React from 'react';
import { Col, Row } from 'reactstrap';
import moment from 'moment';
import { withRouter } from 'react-router';

const TaskView = props => {
	const {selectedTask, history} = props;
	return (
		<div className="task-view">
			<Row>
				<h3 className="col-md-12">View<span>Task</span></h3>
				<Col md="12">
					<p><span>Number: </span>{selectedTask.taskNumber}</p>
				</Col>
				<Col md="12">
					<p><span>Title: </span>{selectedTask.title}</p>
				</Col>
				<Col md="12">
					<p><span>Description: </span>{selectedTask.description}</p>
				</Col>
				<Col md="6">
					<p><span>Start Date: </span>{moment(selectedTask.startDate).format('MMM Do YYYY')}</p>
				</Col>
				<Col md="6">
					<p><span>End Date: </span>{moment(selectedTask.endDate).format('MMM Do YYYY')}</p>
				</Col>
				<Col md="12">
					<p><span>Developer: </span>{selectedTask.developer}</p>
				</Col>
				<Col md="12">
					<p style={{textTransform: 'capitalize'}}><span>Priority: </span>{selectedTask.priority}</p>
				</Col>
				<Col md={{size: 6, offset: 3}}>
					<button className="btn"
					        onClick={() => history.push(`/board/${selectedTask.boardId}`)}>BackTo<span>Board</span></button>
				</Col>
			</Row>
		</div>
	);
};

export default withRouter(TaskView);