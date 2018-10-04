import React from 'react';
import { Col, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Header = props => {
	const {selectedBoard} = props;
	return (
		<Row className="header">
			<Col md="6">
				<NavLink
					exact to="/">
					Board
				</NavLink>
			</Col>
			<Col md="6">
				<NavLink
					to={`/board/${selectedBoard.id}/create-task`}>
					<button className="btn">Create Task</button>
				</NavLink>
			</Col>
		</Row>
	);
};

export default Header;