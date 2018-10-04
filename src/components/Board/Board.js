import React from 'react';
import { Col, Row } from 'reactstrap';

import BacklogTasks from './BacklogTasks/BacklogTasks';
import DevelopTasks from './DevelopTasks/DevelopTasks';
import TestTasks from './TestTasks/TestTasks';
import DoneTasks from './DoneTasks/DoneTasks';
import Header from '../Header/Header';

const Board = props => {
	const {tasks, backlogTasks, developTasks, testTasks, doneTasks, onDrop, selectedBoard} = props;
	return (
		<Row className="board">
			<Header selectedBoard={selectedBoard}/>
			<div>{selectedBoard.id}</div>
			<Col md="3">
				<h3>> Backlog (<span>{backlogTasks.length}</span>)</h3>
				<BacklogTasks
					backlogTasks={backlogTasks}
					onDrop={onDrop} />
			</Col>
			<Col md="3">
				<h3>> Develop (<span>{developTasks.length}</span>)</h3>
				<DevelopTasks
					developTasks={developTasks}
					onDrop={onDrop} />
			</Col>
			<Col md="3">
				<h3>> Test (<span>{testTasks.length}</span>)</h3>
				<TestTasks
					testTasks={testTasks}
					onDrop={onDrop} />
			</Col>
			<Col md="3">
				<h3>> Done Tasks (<span>{doneTasks.length}</span>)</h3>
				<DoneTasks
					doneTasks={doneTasks}
					onDrop={onDrop} />
			</Col>
			<Col md="12">
				total tasks: {tasks.length}
			</Col>
		</Row>

	);
};

export default Board;