import React, { Fragment } from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = props => {
	const {selectedBoard} = props;
	return (
		<Fragment>
			<Col md="6" className="border-info">
				<p>Title: <span>{selectedBoard.boardTitle}</span></p>
				<p>Created Date: <span>{selectedBoard.createDate}</span></p>
			</Col>
			<Col md="6" className="task-create">
				<Link
					style={{textDecoration: 'none'}}
					to={`/board/${selectedBoard.id}/create-task`}>
					<button className="btn">Create <span>Task</span></button>
				</Link>
			</Col>
		</Fragment>
	);
};

export default Header;