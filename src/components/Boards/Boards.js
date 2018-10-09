import React from 'react';
import { Col, Row } from 'reactstrap';

import BoardList from './BoardList/BoardList';
import BoardCreate from './BoardCreate/BoardCreate';
import ClosedBoardsList from './ClosedBoardsList/ClosedBoardsList';

import './Boards.css';

const Boards = props => {
	const {
		boards,
		openBoards,
		closedBoards,
		values,
		onAddBoard,
		onBoardTitleChange,
		onSelectBoard,
		validation
	} = props;
	return (
		<Row className="boards">
			<BoardList
				openBoards={openBoards}
				onSelectBoard={onSelectBoard} />
			<BoardCreate
				openBoards={openBoards}
				boardTitle={values.boardTitle}
				validationBoardTitle={validation.boardTitle}
				onBoardTitleChange={onBoardTitleChange}
				onAddBoard={onAddBoard} />
			<ClosedBoardsList
				closedBoards={closedBoards}
				onSelectBoard={onSelectBoard} />
			<Col md="12">
				<p style={!closedBoards.length ? {marginTop: '30px'} : {marginTop: '0'}}>
					Total Boards: <span>{boards.length}</span>
				</p>
			</Col>
		</Row>

	);
};

export default Boards;