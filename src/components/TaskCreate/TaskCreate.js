import React from 'react';

const TaskCreate = props => {
	const {tasks, developers, values, validation, onTitleChange, onDescriptionChange, onDeveloperChange, onAddTask, selectedBoard} = props;
	return (
		<form className="task-form" onSubmit={e => onAddTask(e, {
			id: +new Date(),
			boardId: selectedBoard.id,
			taskNumber: tasks.length + 1,
			title: values.taskValue,
			description: values.descriptionValue,
			developer: values.developerValue,
			createDate: new Date().toLocaleString('en-US'),
			progress: 'backlog'
		})}>
			<h3>Create<span>Task</span></h3>
			<div className="validation">
				<input
					type="text"
					className={values.taskValue.length >= 3 ? 'validation-success' : ''}
					value={values.taskValue}
					placeholder="Enter Task Name"
					onChange={({target}) => onTitleChange(target.value)} />
				<p
					className={validation.taskValue || validation.taskValue === null ? 'error-field' : 'error-field not-valid'}>
					more than 3 symbols
				</p>
			</div>
			<div className="validation">
				<textarea
					value={values.descriptionValue}
					className={values.descriptionValue.length >= 3 ? 'validation-success' : ''}
					placeholder="Enter Task Description"
					onChange={({target}) => onDescriptionChange(target.value)} />
				<p
					className={validation.descriptionValue || validation.descriptionValue === null ? 'error-field' : 'error-field not-valid'}>
					more than 3 symbols
				</p>
			</div>
			<div className="validation">
				<select
					className={values.developerValue !== 'Choose Developer' || values.developerValue === false ? 'validation-success' : ''}
					onChange={({target}) => onDeveloperChange(target.value)}>
					<option style={{display: 'none'}} value={values.developerValue}>{values.developerValue}</option>
					{developers.map((dev, i) => <option key={i} value={dev.name}>{dev.name}</option>)}
				</select>
				<p
					className={validation.developerValue || validation.developerValue === null ? 'error-field' : 'error-field not-valid'}>
					choose developer
				</p>
			</div>

			<button
				className={validation.taskValue === true &&
				validation.descriptionValue === true &&
				validation.developerValue === true ?
					'validation-success btn' : 'btn'}>
				Add<span>Task</span>
			</button>
		</form>
	);
};

export default TaskCreate;