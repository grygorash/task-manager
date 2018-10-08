import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { Route, Switch, withRouter } from 'react-router';

import {
	addBoard,
	addDev,
	addSelectedBoard,
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
	getSelectedBoard, getDevelopers, getActiveDevelopers
} from '../selectors';
import Loader from '../components/Loader/Loader';
import Boards from '../components/Boards/Boards';
import Board from '../components/Board/Board';
import TaskCreate from '../components/TaskCreate/TaskCreate';
import DeveloperCreate from '../components/DeveloperCreate/DeveloperCreate';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			values: {
				boardValue: '',
				taskValue: '',
				descriptionValue: '',
				developerValue: 'Choose Developer',
				devNameValue: '',
				devEmailValue: ''
			},
			validation: {
				boardValue: null
			}
		};
	};

	componentDidMount() {
		this.props.fetchInitialState();
	}

	componentDidUpdate() {
		localStorage.setItem('boards', JSON.stringify(this.props.boards));
		localStorage.setItem('tasks', JSON.stringify(this.props.tasks));
		localStorage.setItem('developers', JSON.stringify(this.props.developers));
		localStorage.setItem('selectedBoard', JSON.stringify(this.props.selectedBoard));
	}

	handleBoardTitleChange = value => {
		if (value.length >= 3) {
			this.setState((prevState) => ({validation: {...prevState.validation, boardValue: true}}), () => {
			});
		} else {
			this.setState((prevState) => ({validation: {...prevState.validation, boardValue: false}}), () => {
			});
		}
		this.setState((prevState) => ({values: {...prevState.values, boardValue: value}}));
	};

	handleTitleChange = value => {
		this.setState((prevState) => ({values: {...prevState.values, taskValue: value}}));

	};

	handleDescriptionChange = value => {
		this.setState((prevState) => ({values: {...prevState.values, descriptionValue: value}}));
	};

	handleDeveloperChange = value => {
		this.setState((prevState) => ({values: {...prevState.values, developerValue: value}}));
	};

	handleDevNameChange = value => {
		this.setState((prevState) => ({values: {...prevState.values, devNameValue: value}}));
	};

	handleDevEmailChange = value => {
		this.setState((prevState) => ({values: {...prevState.values, devEmailValue: value}}));
	};

	handleAddBoard = (e, board) => {
		e.preventDefault();
		if (this.state.validation.boardValue === true) {
			this.setState((prevState) => ({
					values: {
						...prevState.values,
						boardValue: ''
					},
					validation: {
						...prevState.validation,
						boardValue: null
					}
				}
			));
			this.props.addBoard(board);
		}
	};

	handleAddTask = (e, task) => {
		e.preventDefault();
		this.setState((prevState) => ({
			values: {
				...prevState.values,
				taskValue: '',
				descriptionValue: '',
				developerValue: 'Choose Developer'
			}
		}));

		this.props.addTask(task);
		this.props.history.push(`/board/${task.boardId}`);
	};

	handleAddDev = (e, dev) => {
		e.preventDefault();
		this.setState((prevState) => ({
			values: {
				...prevState.values,
				devNameValue: '',
				devEmailValue: ''
			}
		}));
		this.props.addDev(dev);
		this.props.history.push(`/board/${dev.boardId}`);
	};

	handleDrop = (id, progress) => {
		this.props.changeProgress(id, progress);
	};

	handleSelectBoard = board => {
		this.props.addSelectedBoard(board);
	};

	render() {
		const {
			handleTitleChange,
			handleDescriptionChange,
			handleDeveloperChange,
			handleAddTask,
			handleDrop,
			handleAddBoard,
			handleBoardTitleChange,
			handleSelectBoard,
			handleAddDev,
			handleDevNameChange,
			handleDevEmailChange
		} = this;
		const {
			values,
			validation
		} = this.state;
		const {
			tasks,
			boards,
			getBacklogTasks,
			getDevelopTasks,
			getTestTasks,
			getDoneTasks,
			loaded,
			selectedBoard,
			getActiveTasks,
			getActiveDevelopers
		} = this.props;
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
									<Boards
										boards={boards}
										tasks={tasks}
										backlogTasks={getBacklogTasks}
										developTasks={getDevelopTasks}
										testTasks={getTestTasks}
										doneTasks={getDoneTasks}
										boardValue={values.boardValue}
										validationBoardValue={validation.boardValue}
										onSelectBoard={handleSelectBoard}
										onDrop={handleDrop}
										onBoardTitleChange={handleBoardTitleChange}
										onAddBoard={handleAddBoard}
									/>}
							/>
							<Route
								exact path="/board/:boardId"
								render={() =>
									<Board
										tasks={getActiveTasks}
										developers={getActiveDevelopers}
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
									<TaskCreate
										tasks={getActiveTasks}
										taskValue={values.taskValue}
										descriptionValue={values.descriptionValue}
										developerValue={values.developerValue}
										selectedBoard={selectedBoard}
										developers={getActiveDevelopers}
										onAddTask={handleAddTask}
										onTitleChange={handleTitleChange}
										onDescriptionChange={handleDescriptionChange}
										onDeveloperChange={handleDeveloperChange}
									/>}
							/>
							<Route
								path="/board/:boardId/create-developer"
								render={() =>
									<DeveloperCreate
										devNameValue={values.devNameValue}
										devEmailValue={values.devEmailValue}
										selectedBoard={selectedBoard}
										onAddDev={handleAddDev}
										onDevNameChange={handleDevNameChange}
										onDevEmailChange={handleDevEmailChange}
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
	loaded: getLoadingStatus(state),
	boards: getBoards(state),
	selectedBoard: getSelectedBoard(state),
	tasks: getTasks(state),
	developers: getDevelopers(state),
	getActiveTasks: getActiveTasks(state),
	getActiveDevelopers: getActiveDevelopers(state),
	getBacklogTasks: getBacklogTasks(state),
	getDevelopTasks: getDevelopTasks(state),
	getTestTasks: getTestTasks(state),
	getDoneTasks: getDoneTasks(state)
});

const mapDispatchToProps = dispatch => ({
	fetchInitialState: bindActionCreators(fetchInitialState, dispatch),
	addBoard: bindActionCreators(addBoard, dispatch),
	addTask: bindActionCreators(addTask, dispatch),
	addDev: bindActionCreators(addDev, dispatch),
	addSelectedBoard: bindActionCreators(addSelectedBoard, dispatch),
	changeProgress: bindActionCreators(changeProgress, dispatch),
});

export default withRouter(DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(App)));
