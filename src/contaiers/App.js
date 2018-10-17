import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { Route, Switch, withRouter } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {
	addBoard,
	addDev,
	addSelectedBoard,
	addTask,
	changeProgress, closeBoard,
	fetchInitialState, removeBoard
} from '../actions';
import {
	getActiveBoardTasks,
	getTasksByProgress,
	getActiveBoardDevelopers,
	getBoardsStatus,
	getLoadingStatus,
	getAllTasks, getBoards,
	getSelectedBoard,
	getDevelopers
} from '../selectors';
import Loader from '../components/Loader/Loader';
import Boards from '../components/Boards/Boards';
import Board from '../components/Board/Board';
import TaskCreate from '../components/TaskCreate/TaskCreate';
import DeveloperCreate from '../components/DeveloperCreate/DeveloperCreate';

import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			values: {
				boardTitle: '',
				taskTitle: '',
				taskDescription: '',
				taskDeveloper: 'Select Developer',
				taskPriority: 'Select Priority',
				taskStartDate: null,
				taskEndDate: null,
				devName: '',
				devEmail: ''
			},
			validation: {
				boardTitle: null,
				taskTitle: null,
				taskDescription: null,
				taskDeveloper: null,
				taskPriority: null,
				taskStartDate: null,
				taskEndDate: null,
				devName: null,
				devEmail: null
			}
		};
	};

	componentDidMount() {
		this.props.fetchInitialState();
	}

	componentDidUpdate() {
		localStorage.setItem('boards', JSON.stringify(this.props.boards));
		localStorage.setItem('tasks', JSON.stringify(this.props.getAllTasks));
		localStorage.setItem('developers', JSON.stringify(this.props.developers));
		localStorage.setItem('selectedBoard', JSON.stringify(this.props.selectedBoard));
	}

	handleBoardTitleChange = value => {
		if (value.length >= 3) {
			this.setState((prevState) => ({validation: {...prevState.validation, boardTitle: true}}));
		} else {
			this.setState((prevState) => ({validation: {...prevState.validation, boardTitle: false}}));
		}
		this.setState((prevState) => ({values: {...prevState.values, boardTitle: value}}));
	};

	handleTitleChange = value => {
		if (value.length >= 3) {
			this.setState((prevState) => ({validation: {...prevState.validation, taskTitle: true}}));
		} else {
			this.setState((prevState) => ({validation: {...prevState.validation, taskTitle: false}}));
		}
		this.setState((prevState) => ({values: {...prevState.values, taskTitle: value}}));

	};

	handleDescriptionChange = value => {
		if (value.length >= 3) {
			this.setState((prevState) => ({validation: {...prevState.validation, taskDescription: true}}));
		} else {
			this.setState((prevState) => ({validation: {...prevState.validation, taskDescription: false}}));
		}
		this.setState((prevState) => ({values: {...prevState.values, taskDescription: value}}));
	};

	handleChangeStart = date => {
		if (date) {
			this.setState((prevState) => ({validation: {...prevState.validation, taskStartDate: true}}));
		} else {
			this.setState((prevState) => ({validation: {...prevState.validation, taskStartDate: false}}));
		}
		this.setState((prevState) => ({values: {...prevState.values, taskStartDate: date}}));
	};

	handleChangeEnd = date => {
		if (date) {
			this.setState((prevState) => ({validation: {...prevState.validation, taskEndDate: true}}));
		} else {
			this.setState((prevState) => ({validation: {...prevState.validation, taskEndDate: false}}));
		}
		this.setState((prevState) => ({values: {...prevState.values, taskEndDate: date}}));
	};

	handleDeveloperChange = value => {
		if (value !== 'Select Developer') {
			this.setState((prevState) => ({validation: {...prevState.validation, taskDeveloper: true}}));
		} else {
			this.setState((prevState) => ({validation: {...prevState.validation, taskDeveloper: false}}));
		}
		this.setState((prevState) => ({values: {...prevState.values, taskDeveloper: value}}));
	};

	handlePriorityChange = value => {
		if (value !== 'Select Priority') {
			this.setState((prevState) => ({validation: {...prevState.validation, taskPriority: true}}));
		} else {
			this.setState((prevState) => ({validation: {...prevState.validation, taskPriority: false}}));
		}
		this.setState((prevState) => ({values: {...prevState.values, taskPriority: value}}));
	};

	handleDevNameChange = value => {
		if (value.length >= 3) {
			this.setState((prevState) => ({validation: {...prevState.validation, devName: true}}));
		} else {
			this.setState((prevState) => ({validation: {...prevState.validation, devName: false}}));
		}
		this.setState((prevState) => ({values: {...prevState.values, devName: value}}));
	};

	handleDevEmailChange = value => {
		const emailValidation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		if (value.match(emailValidation)) {
			this.setState((prevState) => ({validation: {...prevState.validation, devEmail: true}}));
		} else {
			this.setState((prevState) => ({validation: {...prevState.validation, devEmail: false}}));
		}
		this.setState((prevState) => ({values: {...prevState.values, devEmail: value}}));
	};

	handleAddBoard = (e, board) => {
		e.preventDefault();
		if (this.state.validation.boardTitle === true) {
			this.setState((prevState) => ({
					values: {
						...prevState.values,
						boardTitle: ''
					},
					validation: {
						...prevState.validation,
						boardTitle: null
					}
				}
			));
			this.props.addBoard(board);
		} else {
			this.setState((prevState) => ({
					validation: {
						...prevState.validation,
						boardTitle: false
					}
				}
			));
		}
	};

	handleRemoveBoard = board => {
		this.props.removeBoard(board);
		this.props.history.push('/');
	};

	handleAddTask = (e, task) => {
		e.preventDefault();
		if (this.state.validation.taskTitle === true &&
			this.state.validation.taskDescription === true &&
			this.state.validation.taskStartDate === true &&
			this.state.validation.taskEndDate === true &&
			this.state.validation.taskDeveloper === true &&
			this.state.validation.taskPriority === true) {
			this.setState((prevState) => ({
					values: {
						...prevState.values,
						taskTitle: '',
						taskDescription: '',
						taskDeveloper: 'Select Developer',
						taskPriority: 'Select Priority',
						taskStartDate: null,
						taskEndDate: null
					},
					validation: {
						...prevState.validation,
						taskTitle: null,
						taskDescription: null,
						taskPriority: null,
						taskDeveloper: null,
						taskStartDate: null,
						taskEndDate: null
					}
				}
			));
			this.props.addTask(task);
			this.props.history.push(`/board/${task.boardId}`);
		} else {
			if (this.state.values.taskTitle.length >= 3) {
				this.setState((prevState) => ({
						validation: {
							...prevState.validation,
							taskTitle: true
						}
					}
				));
			} else {
				this.setState((prevState) => ({
						validation: {
							...prevState.validation,
							taskTitle: false
						}
					}
				));
			}

			if (this.state.values.taskDescription.length >= 3) {
				this.setState((prevState) => ({
						validation: {
							...prevState.validation,
							taskDescription: true
						}
					}
				));
			} else {
				this.setState((prevState) => ({
						validation: {
							...prevState.validation,
							taskDescription: false
						}
					}
				));
			}

			if (this.state.values.taskDeveloper !== 'Select Developer') {
				this.setState((prevState) => ({
						validation: {
							...prevState.validation,
							taskDeveloper: true
						}
					}
				));
			} else {
				this.setState((prevState) => ({
						validation: {
							...prevState.validation,
							taskDeveloper: false
						}
					}
				));
			}

			if (this.state.values.taskPriority !== 'Select Priority') {
				this.setState((prevState) => ({
						validation: {
							...prevState.validation,
							taskPriority: true
						}
					}
				));
			} else {
				this.setState((prevState) => ({
						validation: {
							...prevState.validation,
							taskPriority: false
						}
					}
				));
			}

			if (this.state.values.taskStartDate) {
				this.setState((prevState) => ({
						validation: {
							...prevState.validation,
							taskStartDate: true
						}
					}
				));
			} else {
				this.setState((prevState) => ({
						validation: {
							...prevState.validation,
							taskStartDate: false
						}
					}
				));
			}

			if (this.state.values.taskEndDate) {
				this.setState((prevState) => ({
						validation: {
							...prevState.validation,
							taskEndDate: true
						}
					}
				));
			} else {
				this.setState((prevState) => ({
						validation: {
							...prevState.validation,
							taskEndDate: false
						}
					}
				));
			}
		}
	};

	handleAddDev = (e, dev) => {
		e.preventDefault();
		const emailValidation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		if (this.state.validation.devName === true &&
			this.state.validation.devEmail === true) {
			this.setState((prevState) => ({
					values: {
						...prevState.values,
						devName: '',
						devEmail: ''
					},
					validation: {
						...prevState.validation,
						devName: null,
						devEmail: null,
					}
				}
			));
			this.props.addDev(dev);
			this.props.history.push(`/board/${dev.boardId}`);
		} else {

			if (this.state.values.devName.length >= 3) {
				this.setState((prevState) => ({
						validation: {
							...prevState.validation,
							devName: true
						}
					}
				));
			} else {
				this.setState((prevState) => ({
						validation: {
							...prevState.validation,
							devName: false
						}
					}
				));
			}

			if (this.state.values.devEmail.match(emailValidation)) {
				this.setState((prevState) => ({
						validation: {
							...prevState.validation,
							devEmail: true
						}
					}
				));
			} else {
				this.setState((prevState) => ({
						validation: {
							...prevState.validation,
							devEmail: false
						}
					}
				));
			}
		}
	};

	handleDrop = (id, progress) => {
		this.props.changeProgress(id, progress);
	};

	handleSelectBoard = board => {
		this.props.addSelectedBoard(board);
	};

	handleCloseBoard = board => {
		this.props.closeBoard(board);
		this.props.history.push('/');
	};

	render() {
		const {
			handleTitleChange,
			handleDescriptionChange,
			handleChangeStart,
			handleChangeEnd,
			handleDeveloperChange,
			handlePriorityChange,
			handleAddTask,
			handleDrop,
			handleAddBoard,
			handleRemoveBoard,
			handleBoardTitleChange,
			handleSelectBoard,
			handleAddDev,
			handleDevNameChange,
			handleDevEmailChange,
			handleCloseBoard
		} = this;
		const {
			values,
			validation
		} = this.state;
		const {
			getAllTasks,
			tasksByProgress,
			boards,
			getBoardsStatus,
			loaded,
			selectedBoard,
			getActiveBoardTasks,
			getActiveBoardDevelopers
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
										boardsStatus={getBoardsStatus}
										tasks={getAllTasks}
										values={values}
										validation={validation}
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
										activeBoardTasks={getActiveBoardTasks}
										tasksByProgress={tasksByProgress}
										developers={getActiveBoardDevelopers}
										selectedBoard={selectedBoard}
										onDrop={handleDrop}
										onCloseBoard={handleCloseBoard}
										onRemoveBoard={handleRemoveBoard}
									/>}
							/>
							<Route
								path="/board/:boardId/create-task"
								render={() =>
									<TaskCreate
										activeBoardTasks={getActiveBoardTasks}
										developers={getActiveBoardDevelopers}
										values={values}
										validation={validation}
										selectedBoard={selectedBoard}
										onAddTask={handleAddTask}
										onTitleChange={handleTitleChange}
										onDescriptionChange={handleDescriptionChange}
										onChangeStart={handleChangeStart}
										onChangeEnd={handleChangeEnd}
										onDeveloperChange={handleDeveloperChange}
										onPriorityChange={handlePriorityChange}
									/>}
							/>
							<Route
								path="/board/:boardId/create-developer"
								render={() =>
									<DeveloperCreate
										values={values}
										validation={validation}
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
	getAllTasks: getAllTasks(state),
	tasksByProgress: getTasksByProgress(state),
	developers: getDevelopers(state),
	getActiveBoardTasks: getActiveBoardTasks(state),
	getActiveBoardDevelopers: getActiveBoardDevelopers(state),
	getBoardsStatus: getBoardsStatus(state)
});

const mapDispatchToProps = dispatch => ({
	fetchInitialState: bindActionCreators(fetchInitialState, dispatch),
	addBoard: bindActionCreators(addBoard, dispatch),
	removeBoard: bindActionCreators(removeBoard, dispatch),
	addTask: bindActionCreators(addTask, dispatch),
	addDev: bindActionCreators(addDev, dispatch),
	addSelectedBoard: bindActionCreators(addSelectedBoard, dispatch),
	changeProgress: bindActionCreators(changeProgress, dispatch),
	closeBoard: bindActionCreators(closeBoard, dispatch),
});

export default withRouter(DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(App)));
