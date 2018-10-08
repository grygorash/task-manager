import React from 'react';

const AddTask = props => {
	const {tasks, onTitleChange, onDescriptionChange, onAddTask, taskValue, descriptionValue, selectedBoard} = props;
	return (
		<form className="task-form" onSubmit={e => onAddTask(e, {
			id: +new Date(),
			boardId: selectedBoard.id,
			taskNumber: tasks.length + 1,
			title: taskValue,
			description: descriptionValue,
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
			<button className="btn">Add<span>Task</span></button>
		</form>
	);
};

export default AddTask;