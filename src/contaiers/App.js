import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import { addTask, changeProgress, fetchTasks } from '../actions';
import {
	getBacklogTasks,
	getDevelopTasks,
	getTestTasks,
	getDoneTasks,
	getLoadingStatus,
	getTasks
} from '../selectors';
import Loader from '../components/Loader/Loader';
import AddTask from '../components/AddTask/AddTask';
import BacklogTasks from '../components/BacklogTasks/BacklogTasks';
import DevelopTasks from '../components/DevelopTasks/DevelopTasks';
import TestTasks from '../components/TestTasks/TestTasks';
import DoneTasks from '../components/DoneTasks/DoneTasks';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskValue: ''
		};
	};

	componentDidMount() {
		this.props.fetchTasks();
	}

	componentDidUpdate() {
		localStorage.setItem('tasks', JSON.stringify(this.props.tasks));
	}

	handleInputChangeAdd = value => {
		this.setState({taskValue: value});
	};

	handleAddTask = (e, task) => {
		e.preventDefault();
		this.setState({taskValue: ''});
		this.props.addTask(task);
	};

	handleDrop = (id, progress) => {
		this.props.changeProgress(id, progress);
	};

	render() {
		const {handleInputChangeAdd, handleAddTask, handleDrop} = this;
		const {taskValue} = this.state;
		const {tasks, getBacklogTasks, getDevelopTasks, getTestTasks, getDoneTasks, loaded} = this.props;

		return (
			<Fragment>
				{loaded ? (
					<div className="App">
						<Container fluid={true}>
							<Row>
								<Col md="12">
									<AddTask
										tasks={tasks}
										taskValue={taskValue}
										onAddTask={handleAddTask}
										onInputChangeAdd={handleInputChangeAdd}
									/>
								</Col>
								<Col md="3">
									<h3>> Backlog ({getBacklogTasks.length})</h3>
									<BacklogTasks
										backlogTasks={getBacklogTasks}
										onDrop={handleDrop} />
								</Col>
								<Col md="3">
									<h3>> Develop ({getDevelopTasks.length})</h3>
									<DevelopTasks
										developTasks={getDevelopTasks}
										onDrop={handleDrop} />
								</Col>
								<Col md="3">
									<h3>> Test ({getTestTasks.length})</h3>
									<TestTasks
										testTasks={getTestTasks}
										onDrop={handleDrop} />
								</Col>
								<Col md="3">
									<h3>> Done Tasks ({getDoneTasks.length})</h3>
									<DoneTasks
										doneTasks={getDoneTasks}
										onDrop={handleDrop} />
								</Col>
								<Col md="12">
									total tasks: {tasks.length}
								</Col>
							</Row>
						</Container>
					</div>
				) : <Loader />}
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	tasks: getTasks(state),
	getBacklogTasks: getBacklogTasks(state),
	getDevelopTasks: getDevelopTasks(state),
	getTestTasks: getTestTasks(state),
	getDoneTasks: getDoneTasks(state),
	loaded: getLoadingStatus(state)
});

const mapDispatchToProps = dispatch => ({
	fetchTasks: bindActionCreators(fetchTasks, dispatch),
	addTask: bindActionCreators(addTask, dispatch),
	changeProgress: bindActionCreators(changeProgress, dispatch),
});

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(App));
