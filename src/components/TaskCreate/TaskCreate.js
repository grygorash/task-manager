import React from 'react';

const TaskCreate = props => {
	const {tasks, developers, onTitleChange, onDescriptionChange, onDeveloperChange, onAddTask, taskValue, descriptionValue, developerValue, selectedBoard} = props;
	return (
		<form className="task-form" onSubmit={e => onAddTask(e, {
			id: +new Date(),
			boardId: selectedBoard.id,
			taskNumber: tasks.length + 1,
			title: taskValue,
			description: descriptionValue,
			developer: developerValue,
			createDate: new Date().toLocaleString('en-US'),
			progress: 'backlog'
		})}>
			<h3>Create<span>Task</span></h3>
			<input type="text"
			       value={taskValue}
			       placeholder="Enter Task Name"
			       onChange={({target}) => onTitleChange(target.value)} />
			<textarea value={descriptionValue}
			          placeholder="Enter Task Description"
			          onChange={({target}) => onDescriptionChange(target.value)} />
			<select onChange={({target}) => onDeveloperChange(target.value)}>
				<option style={{display: 'none'}} value={developerValue}>{developerValue}</option>
				{developers.map((dev, i) => <option key={i} value={dev.name}>{dev.name}</option>)}
			</select>
			<button className="btn">Add<span>Task</span></button>
		</form>
	);
};

export default TaskCreate;