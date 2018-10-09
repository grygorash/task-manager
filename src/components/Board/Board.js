import React from 'react';
import { Col, Row } from 'reactstrap';

import Header from './Header/Header';
import BacklogTasks from './BacklogTasks/BacklogTasks';
import DevelopTasks from './DevelopTasks/DevelopTasks';
import TestTasks from './TestTasks/TestTasks';
import DoneTasks from './DoneTasks/DoneTasks';

import './Board.css';

const Board = props => {
	const {
		tasks,
		developers,
		backlogTasks,
		developTasks,
		testTasks,
		doneTasks,
		onDrop,
		selectedBoard,
		onCloseBoard,
		onRemoveBoard
	} = props;
	return (
		<Row
			className="board"
			style={selectedBoard.status === 'closed' ? {pointerEvents: 'none'} : null}>
			<Header
				selectedBoard={selectedBoard}
				developers={developers} />
			<Col md="3" className="backlog">
				<h3>> Backlog (<span>{backlogTasks.length}</span>)</h3>
				<BacklogTasks
					backlogTasks={backlogTasks}
					onDrop={onDrop} />
			</Col>
			<Col md="3" className="develop">
				<h3>> Develop (<span>{developTasks.length}</span>)</h3>
				<DevelopTasks
					developTasks={developTasks}
					onDrop={onDrop} />
			</Col>
			<Col md="3" className="test">
				<h3>> Test (<span>{testTasks.length}</span>)</h3>
				<TestTasks
					testTasks={testTasks}
					onDrop={onDrop} />
			</Col>
			<Col md="3" className="done">
				<h3>> Done Tasks (<span>{doneTasks.length}</span>)</h3>
				<DoneTasks
					doneTasks={doneTasks}
					onDrop={onDrop} />
			</Col>
			<Col md="6" className="total">
				<p>
					Total Tasks: <span>{tasks.length}</span>
				</p>
			</Col>
			<Col md="6" className="remove-close">
				<button
					onClick={() => onCloseBoard(selectedBoard)}
					style={
						!backlogTasks.length &&
						!developTasks.length &&
						!testTasks.length ?
							{display: 'block', marginRight: '30px'} :
							{display: 'none', marginRight: '0'}
					}
					className={selectedBoard.status === 'closed' || !tasks.length ? 'd-none' : 'btn'}>
					Close<span>Board</span>
				</button>
				<button
					onClick={() => onRemoveBoard(selectedBoard)}
					className={selectedBoard.status === 'closed' ? 'd-none' : 'btn'}>
					Remove<span>Board</span>
				</button>
			</Col>
		</Row>
	);
};

export default Board;