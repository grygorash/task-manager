import React from 'react';
import { Col } from 'reactstrap';

const BoardCreate = props => {
	const {boards, boardValue, onBoardTitleChange, onAddBoard, validationBoardValue} = props;
	return (
		<Col md="12" className="create-board" style={boards.length ? {paddingTop: '0'} : {paddingTop: '20px'}}>
			<p>{boards.length ? 'Or Create New' : 'Create New Board'}</p>
			<form onSubmit={(e) => onAddBoard(e, {
				id: +new Date(),
				boardTitle: boardValue,
				createDate: new Date().toLocaleString('en-US'),
			})}>
				<div className="validation">
					<input
						className={boardValue.length >= 3 ? 'validation-success' : ''}
						type="text"
						value={boardValue}
						placeholder="Enter Name Of Board"
						onChange={({target}) => onBoardTitleChange(target.value)} />
					<p
						className={validationBoardValue || validationBoardValue === null ? 'error-field' : 'error-field not-valid'}>
						more than 3 symbols
					</p>
				</div>
				<button className={boardValue.length >= 3 ? 'validation-success btn' : 'btn'}>Add <span>Board</span></button>
			</form>
		</Col>
	);
};

export default BoardCreate;