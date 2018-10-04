import React from 'react';
import { Link } from 'react-router-dom';

const BoardList = props => {
	const {boards, onSelectBoard} = props;
	return (
		<div>
			{boards.map((board, i) => (
				<Link key={i} to={`/board/${board.id}`} onClick={() => onSelectBoard(board)}>
					{board.boardTitle}
				</Link>
			))}
		</div>
	);
};

export default BoardList;