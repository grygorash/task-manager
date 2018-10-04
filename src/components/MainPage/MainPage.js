import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import BoardList from './BoardList/BoardList';
import BoardCreate from './BoardCreate/BoardCreate';
import { Route, Switch } from 'react-router';
import AddTask from '../AddTask/AddTask';
import Board from '../Board/Board';

const MainPage = props => {
	const {boards, tasks, boardValue, backlogTasks, developTasks, testTasks, onAddBoard, doneTasks, onDrop, onBoardTitleChange, onSelectBoard} = props;
	// console.log('--->', props);
	return (
		<Fragment>
			<BoardList
				boards={boards}
				onSelectBoard={onSelectBoard}/>
			<BoardCreate
				boardValue={boardValue}
				onBoardTitleChange={onBoardTitleChange}
				onAddBoard={onAddBoard} />

		</Fragment>

	);
};

export default MainPage;