import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';

const BoardList = props => {
	const {boards, onSelectBoard} = props;
	return (
		<Fragment>
			{boards.length ? (
				<Col md="12" className="board-list">
					<p>Choose your board</p>
					{boards.map((board, i) => (
						<Link className="btn" key={i} to={`/board/${board.id}`} onClick={() => onSelectBoard(board)}>
							<p>Title: <span>{board.boardTitle}</span></p>
							<p>Created date: <span>{board.createDate}</span></p>
						</Link>
					))}
				</Col>
			) : null}
		</Fragment>
	);
};

export default BoardList;