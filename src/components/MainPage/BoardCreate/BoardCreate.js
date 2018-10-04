import React from 'react';

const BoardCreate = props => {
	const {boardValue, onBoardTitleChange, onAddBoard} = props;
	return (
		<form onSubmit={(e) => onAddBoard(e, {
			id: +new Date(),
			boardTitle: boardValue,
			createDate: new Date().toLocaleString('en-US'),
		})}>
			<input
				type="text"
				value={boardValue}
				placeholder="enter name of board"
				onChange={({target}) => onBoardTitleChange(target.value)} />
			<button>add board</button>
		</form>
	);
};

export default BoardCreate;