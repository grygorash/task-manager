import React from 'react';
import { Col } from 'reactstrap';
import moment from 'moment';

const BoardCreate = props => {
	const {openBoards, boardTitle, onBoardTitleChange, onAddBoard, validationBoardTitle} = props;
	return (
		<Col
			md="12"
			className="create-board"
			style={openBoards.length ? {paddingTop: '0'} : {paddingTop: '20px'}}>
			<p>{openBoards.length ? 'Or Create New' : 'Create New Board'}</p>
			<form onSubmit={(e) => onAddBoard(e, {
				id: +new Date(),
				boardTitle: boardTitle,
				startDate: moment(),
				endDate: null,
				status: 'open',
				filterByPriority: 'none',
				filterByDeveloper: 'none'
			})}>
				<div className="validation">
					<input
						className={boardTitle.length >= 3 ? 'validation-success' : ''}
						type="text"
						value={boardTitle}
						placeholder="Enter Name Of Board"
						onChange={({target}) => onBoardTitleChange(target.value)} />
					<p
						className={validationBoardTitle || validationBoardTitle === null ? 'error-field' : 'error-field not-valid'}>
						more than 3 symbols
					</p>
				</div>
				<button className={boardTitle.length >= 3 ? 'validation-success btn' : 'btn'}>Add <span>Board</span></button>
			</form>
		</Col>
	);
};

export default BoardCreate;