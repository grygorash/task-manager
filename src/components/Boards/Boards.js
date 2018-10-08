import React from 'react';
import BoardList from './BoardList/BoardList';
import BoardCreate from './BoardCreate/BoardCreate';
import { Row } from 'reactstrap';

const Boards = props => {
	const {boards, boardValue, onAddBoard, onBoardTitleChange, onSelectBoard, validationBoardValue} = props;

	return (
		<Row className="boards">
			<BoardList
				boards={boards}
				onSelectBoard={onSelectBoard} />
			<BoardCreate
				boards={boards}
				boardValue={boardValue}
				validationBoardValue={validationBoardValue}
				onBoardTitleChange={onBoardTitleChange}
				onAddBoard={onAddBoard} />
		</Row>

	);
};

export default Boards;