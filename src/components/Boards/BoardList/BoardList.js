import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import moment from 'moment';

const BoardList = props => {
	const {openBoards, onSelectBoard} = props;
	return (
		<Fragment>
			{openBoards.length ? (
				<Col
					md="12"
					className="board-list">
					<p>Select your board</p>
					<div className="list">
						{openBoards.map((board, i) => (
							<Link
								className="btn"
								key={i}
								to={`/board/${board.id}`}
								onClick={() => onSelectBoard(board)}>
								<p><span>Title: </span>{board.boardTitle}</p>
								<p><span>Start Date: </span>{moment(board.startDate).format('MMM Do YYYY')}</p>
								<p><span>End Date: </span>{board.endDate ? moment(board.endDate).format('MMM Do YYYY') : '-'}</p>
							</Link>
						))}
					</div>
				</Col>
			) : null}
		</Fragment>
	);
};

export default BoardList;