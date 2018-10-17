import React from 'react';
import { Col, Row } from 'reactstrap';

import BoardList from './BoardList/BoardList';
import BoardCreate from './BoardCreate/BoardCreate';
import ClosedBoardsList from './ClosedBoardsList/ClosedBoardsList';

import './Boards.css';

const Boards = props => {
	const {
		boards,
		boardsStatus,
		values,
		onAddBoard,
		onBoardTitleChange,
		onSelectBoard,
		validation
	} = props;
	return (
		<Row className="boards">
			<BoardList
				openBoards={boardsStatus.open}
				onSelectBoard={onSelectBoard} />
			<BoardCreate
				openBoards={boardsStatus.open}
				boardTitle={values.boardTitle}
				validationBoardTitle={validation.boardTitle}
				onBoardTitleChange={onBoardTitleChange}
				onAddBoard={onAddBoard} />
			<ClosedBoardsList
				closedBoards={boardsStatus.closed}
				onSelectBoard={onSelectBoard} />
			<Col md="12">
				<p style={!boardsStatus.closed.length ? {marginTop: '30px'} : {marginTop: '0'}}>
					Total Boards: <span>{boards.length}</span>
				</p>
			</Col>
		</Row>

	);
};

export default Boards;