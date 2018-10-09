import React from 'react';
import DatePicker from 'react-datepicker';
import { Col, Row } from 'reactstrap';
import { withRouter } from 'react-router';
import moment from 'moment';

import './TaskCreate.css';

const TaskCreate = props => {
	const {
		tasks,
		developers,
		values,
		validation,
		onTitleChange,
		onDescriptionChange,
		onChangeStart,
		onChangeEnd,
		onDeveloperChange,
		onAddTask,
		selectedBoard
	} = props;
	return (
		<form className="task-form" onSubmit={e => onAddTask(e, {
			id: +new Date(),
			boardId: selectedBoard.id,
			taskNumber: tasks.length + 1,
			title: values.taskTitle,
			description: values.taskDescription,
			developer: values.taskDeveloper,
			startDate: values.taskStartDate,
			endDate: values.taskEndDate,
			progress: 'backlog'
		})}>
			<Row>
				<h3 className="col-md-12">Create<span>Task</span></h3>
				<Col md="12" className="validation">
					<input
						type="text"
						className={values.taskTitle.length >= 3 ? 'validation-success' : ''}
						value={values.taskTitle}
						placeholder="Enter Task Name"
						onChange={({target}) => onTitleChange(target.value)} />
					<p
						className={validation.taskTitle || validation.taskTitle === null ? 'error-field' : 'error-field not-valid'}>
						more than 3 symbols
					</p>
				</Col>
				<Col md="12" className="validation">
					<textarea
						value={values.taskDescription}
						className={values.taskDescription.length >= 3 ? 'validation-success' : ''}
						placeholder="Enter Task Description"
						onChange={({target}) => onDescriptionChange(target.value)} />
					<p
						className={validation.taskDescription || validation.taskDescription === null ? 'error-field' : 'error-field not-valid'}>
						more than 3 symbols
					</p>
				</Col>
				<Col md="6" className="validation">
					<DatePicker
						selected={values.taskStartDate}
						selectsStart
						startDate={values.taskStartDate}
						dateFormat="LL"
						className={values.taskStartDate ? 'validation-success' : ''}
						minDate={moment()}
						endDate={values.taskEndDate}
						onChange={onChangeStart}
						placeholderText="Select Start Date"
					/>
					<p
						className={validation.taskStartDate || validation.taskStartDate === null ? 'error-field' : 'error-field not-valid'}>
						select start date
					</p>
				</Col>
				<Col md="6" className="validation">
					<DatePicker
						selected={values.taskEndDate}
						selectsEnd
						startDate={values.taskStartDate}
						dateFormat="LL"
						className={values.taskEndDate ? 'validation-success' : ''}
						minDate={moment()}
						endDate={values.taskEndDate}
						onChange={onChangeEnd}
						placeholderText="Select End Date"
					/>
					<p
						className={validation.taskEndDate || validation.taskEndDate === null ? 'error-field' : 'error-field not-valid'}>
						select end date
					</p>
				</Col>
				<Col md="12" className="validation">
					<select
						className={values.taskDeveloper !== 'Select Developer' || values.taskDeveloper === false ? 'validation-success' : ''}
						onChange={({target}) => onDeveloperChange(target.value)}>
						<option style={{display: 'none'}} value={values.taskDeveloper}>{values.taskDeveloper}</option>
						{developers.map((dev, i) => <option key={i} value={dev.name}>{dev.name}</option>)}
					</select>
					<p
						className={validation.taskDeveloper || validation.taskDeveloper === null ? 'error-field' : 'error-field not-valid'}>
						select developer
					</p>
				</Col>
				<Col md="6">
					<button
						className={validation.taskTitle === true &&
						validation.taskDescription === true &&
						validation.taskStartDate === true &&
						validation.taskEndDate === true &&
						validation.taskDeveloper === true ?
							'validation-success btn' : 'btn'}>
						Add<span>Task</span>
					</button>
				</Col>
				<Col md="6">
					<button className="btn" onClick={()=>props.history.push(`/board/${selectedBoard.id}`)}>Cancel</button>
				</Col>
			</Row>
		</form>
	);
};

export default withRouter(TaskCreate);