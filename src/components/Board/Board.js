import React from 'react';
import { Col, Row } from 'reactstrap';

import Header from './Header/Header';
import BacklogTasks from './BacklogTasks/BacklogTasks';
import DevelopTasks from './DevelopTasks/DevelopTasks';
import TestTasks from './TestTasks/TestTasks';
import DoneTasks from './DoneTasks/DoneTasks';

const Board = props => {
	const {tasks, developers, backlogTasks, developTasks, testTasks, doneTasks, onDrop, selectedBoard} = props;
	return (
		<Row className="board">
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
			<Col md="12">
				Total Tasks: {tasks.length}
			</Col>
		</Row>

	);
};

export default Board;