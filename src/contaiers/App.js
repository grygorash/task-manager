import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { Route, Switch, withRouter } from 'react-router';

import {
	addBoard, addSelectedBoard,
	addTask,
	changeProgress,
	fetchInitialState
} from '../actions';
import {
	getActiveTasks,
	getBacklogTasks,
	getDevelopTasks,
	getTestTasks,
	getDoneTasks,
	getLoadingStatus,
	getTasks, getBoards,
	getSelectedBoard
} from '../selectors';
import Loader from '../components/Loader/Loader';
import AddTask from '../components/AddTask/AddTask';
import Board from '../components/Board/Board';

import './App.css';
import MainPage from '../components/MainPage/MainPage';
import { Link } from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			boardValue: '',
			taskValue: '',
			descriptionValue: ''
		};
	};

	componentDidMount() {
		this.props.fetchInitialState();
	}

	componentDidUpdate() {
		localStorage.setItem('boards', JSON.stringify(this.props.boards));
		localStorage.setItem('tasks', JSON.stringify(this.props.tasks));
		localStorage.setItem('selectedBoard', JSON.stringify(this.props.selectedBoard));
	}

	handleBoardTitleChange = value => {
		this.setState({boardValue: value});
	};

	onTitleChange = value => {
		this.setState({taskValue: value});
	};

	onDescriptionChange = value => {
		this.setState({descriptionValue: value});
	};

	handleAddBoard = (e, board) => {
		e.preventDefault();
		this.setState({boardValue: ''});
		this.props.addBoard(board);
	};

	handleAddTask = (e, task) => {
		e.preventDefault();
		this.setState({taskValue: '', descriptionValue: ''});
		this.props.addTask(task);
		this.props.history.push(`/board/${task.boardId}`);
	};

	handleDrop = (id, progress) => {
		this.props.changeProgress(id, progress);
	};

	handleSelectBoard = board => {
		this.props.addSelectedBoard(board);
	};

	render() {
		const {onTitleChange, onDescriptionChange, handleAddTask, handleDrop, handleAddBoard, handleBoardTitleChange, handleSelectBoard} = this;
		const {boardValue, taskValue, descriptionValue} = this.state;
		const {tasks, boards, getBacklogTasks, getDevelopTasks, getTestTasks, getDoneTasks, loaded, selectedBoard, getActiveTasks} = this.props;
		return (
			<Fragment>
				{loaded ? (
					<Container className="app" fluid={true}>
						<Row className="header">
							<h1 className="logo"
							    onClick={() => {this.props.history.push('/');}}>
								drag<span>n</span>drop<span>Boards</span>
							</h1>
						</Row>
						<Switch>
							<Route
								exact path="/"
								render={() =>
									<MainPage
										boards={boards}
										tasks={tasks}
										backlogTasks={getBacklogTasks}
										developTasks={getDevelopTasks}
										testTasks={getTestTasks}
										doneTasks={getDoneTasks}
										boardValue={boardValue}
										onSelectBoard={handleSelectBoard}
										onDrop={handleDrop}
										onBoardTitleChange={handleBoardTitleChange}
										onAddBoard={handleAddBoard} />}
							/>
							<Route
								exact path="/board/:boardId"
								render={() =>
									<Board
										tasks={getActiveTasks}
										selectedBoard={selectedBoard}
										backlogTasks={getBacklogTasks}
										developTasks={getDevelopTasks}
										testTasks={getTestTasks}
										doneTasks={getDoneTasks}
										onDrop={handleDrop}
									/>}
							/>
							<Route
								path="/board/:boardId/create-task"
								render={() =>
									<AddTask
										tasks={getActiveTasks}
										taskValue={taskValue}
										descriptionValue={descriptionValue}
										selectedBoard={selectedBoard}
										onAddTask={handleAddTask}
										onTitleChange={onTitleChange}
										onDescriptionChange={onDescriptionChange}
									/>}
							/>
						</Switch>
					</Container>
				) : <Loader />}
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	boards: getBoards(state),
	selectedBoard: getSelectedBoard(state),
	tasks: getTasks(state),
	getBacklogTasks: getBacklogTasks(state),
	getDevelopTasks: getDevelopTasks(state),
	getTestTasks: getTestTasks(state),
	getDoneTasks: getDoneTasks(state),
	getActiveTasks: getActiveTasks(state),
	loaded: getLoadingStatus(state)
});

const mapDispatchToProps = dispatch => ({
	fetchInitialState: bindActionCreators(fetchInitialState, dispatch),
	addSelectedBoard: bindActionCreators(addSelectedBoard, dispatch),
	addBoard: bindActionCreators(addBoard, dispatch),
	addTask: bindActionCreators(addTask, dispatch),
	changeProgress: bindActionCreators(changeProgress, dispatch),
});

export default withRouter(DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(App)));
