import React, { Fragment } from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ClosedBoardsList = props => {
	const {closedBoards, onSelectBoard} = props;
	return (
		<Fragment>
			{closedBoards.length ? (
				<Col md="12" className="closed-board-list">
					<p>Closed Boards</p>
					<div className="list">
						{closedBoards.map((board, i) => (
							<div className="closed">
								<div className="status">closed</div>
								<Link className="btn" key={i} to={`/board/${board.id}`} onClick={() => onSelectBoard(board)}>
									<p>Title: <span>{board.boardTitle}</span></p>
									<p>Start Date: <span>{moment(board.startDate).format('MMM Do YYYY')}</span></p>
									<p>End Date: <span>{board.endDate ? moment(board.endDate).format('MMM Do YYYY') : '-'}</span></p>
								</Link>
							</div>
						))}
					</div>
				</Col>
			) : null}
		</Fragment>);
};

export default ClosedBoardsList;