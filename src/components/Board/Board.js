import React, { Fragment } from 'react';
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
		onRemoveBoard,
		onFilterChange,
		onDeveloperFilterChange,
		tasksByFilter
	} = props;
	return (
		<Row
			className="board"
			style={selectedBoard.status === 'closed' ? {pointerEvents: 'none'} : null}>
			<Header
				selectedBoard={selectedBoard}
				activeBoardTasks={activeBoardTasks}
				developers={developers}
				onFilterChange={onFilterChange}
				onDeveloperFilterChange={onDeveloperFilterChange} />
			<Col md="3" className="backlog">
				<h3>> Backlog (<span>{tasksByFilter.backlog.length}</span>)</h3>
				<BacklogTasks
					backlogTasks={tasksByFilter.backlog}
					onDrop={onDrop} />
			</Col>
			<Col md="3" className="develop">
				<h3>> Develop (<span>{tasksByFilter.develop.length}</span>)</h3>
				<DevelopTasks
					developTasks={tasksByFilter.develop}
					onDrop={onDrop} />
			</Col>
			<Col md="3" className="test">
				<h3>> Test (<span>{tasksByFilter.test.length}</span>)</h3>
				<TestTasks
					testTasks={tasksByFilter.test}
					onDrop={onDrop} />
			</Col>
			<Col md="3" className="done">
				<h3>> Done Tasks (<span>{tasksByFilter.done.length}</span>)</h3>
				<DoneTasks
					doneTasks={tasksByFilter.done}
					onDrop={onDrop} />
			</Col> <Col md="6" className="total">
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