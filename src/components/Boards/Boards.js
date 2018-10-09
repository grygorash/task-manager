import React from 'react';
import BoardList from './BoardList/BoardList';
import BoardCreate from './BoardCreate/BoardCreate';
import { Row } from 'reactstrap';

import './Boards.css';

const Boards = props => {
	const {boards, values, onAddBoard, onBoardTitleChange, onSelectBoard, validation} = props;

	return (
		<Row className="boards">
			<BoardList
				boards={boards}
				onSelectBoard={onSelectBoard} />
			<BoardCreate
				boards={boards}
				boardTitle={values.boardTitle}
				validationBoardTitle={validation.boardTitle}
				onBoardTitleChange={onBoardTitleChange}
				onAddBoard={onAddBoard} />
		</Row>

	);
};

export default Boards;