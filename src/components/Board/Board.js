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
		activeBoardTasks,
		tasksByProgress,
		developers,
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
				<h3>> Backlog (<span>{tasksByProgress.backlog.length}</span>)</h3>
				<BacklogTasks
					backlogTasks={tasksByProgress.backlog}
					onDrop={onDrop} />
			</Col>
			<Col md="3" className="develop">
				<h3>> Develop (<span>{tasksByProgress.develop.length}</span>)</h3>
				<DevelopTasks
					developTasks={tasksByProgress.develop}
					onDrop={onDrop} />
			</Col>
			<Col md="3" className="test">
				<h3>> Test (<span>{tasksByProgress.test.length}</span>)</h3>
				<TestTasks
					testTasks={tasksByProgress.test}
					onDrop={onDrop} />
			</Col>
			<Col md="3" className="done">
				<h3>> Done Tasks (<span>{tasksByProgress.done.length}</span>)</h3>
				<DoneTasks
					doneTasks={tasksByProgress.done}
					onDrop={onDrop} />
			</Col>
			<Col md="6" className="total">
				<p>
					Total Tasks: <span>{activeBoardTasks.length}</span>
				</p>
			</Col>
			<Col md="6" className="remove-close">
				<button
					onClick={() => onCloseBoard(selectedBoard)}
					style={
						!tasksByProgress.backlog.length &&
						!tasksByProgress.develop.length &&
						!tasksByProgress.test.length ?
							{display: 'block', marginRight: '30px'} :
							{display: 'none', marginRight: '0'}
					}
					className={selectedBoard.status === 'closed' || !activeBoardTasks.length ? 'd-none' : 'btn'}>
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