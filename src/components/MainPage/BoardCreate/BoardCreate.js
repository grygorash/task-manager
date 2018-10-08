import React from 'react';
import { Col } from 'reactstrap';

const BoardCreate = props => {
	const {boards, boardValue, onBoardTitleChange, onAddBoard} = props;
	return (
		<Col md="12" className="create-board" style={boards.length ? {paddingTop: '0'}: {paddingTop: '20px'}}>
			<p>{boards.length ? "Or Create New" : "Create New Board"}</p>
			<form onSubmit={(e) => onAddBoard(e, {
				id: +new Date(),
				boardTitle: boardValue,
				createDate: new Date().toLocaleString('en-US'),
			})}>
				<input
					type="text"
					value={boardValue}
					placeholder="Enter Name Of Board"
					onChange={({target}) => onBoardTitleChange(target.value)} />
				<button className="btn">Add <span>Board</span></button>
			</form>
		</Col>
	);
};

export default BoardCreate;