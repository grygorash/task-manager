import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import moment from 'moment';

const BoardList = props => {
	const {boards, onSelectBoard} = props;
	return (
		<Fragment>
			{boards.length ? (
				<Col md="12" className="board-list">
					<p>Select your board</p>
					<div className="list">
						{boards.map((board, i) => (
							<Link className="btn" key={i} to={`/board/${board.id}`} onClick={() => onSelectBoard(board)}>
								<p>Title: <span>{board.boardTitle}</span></p>
								<p>Start Date: <span>{moment(board.startDate).format("MMM Do YYYY")}</span></p>
								<p>End Date: <span>{board.endDate ? moment(board.endDate).format("MMM Do YYYY") : '-'}</span></p>
							</Link>
						))}
					</div>
				</Col>
			) : null}
		</Fragment>
	);
};

export default BoardList;