import React from 'react';

const AddTask = props => {
	const {tasks, onTitleChange, onDescriptionChange, onAddTask, taskValue, descriptionValue, selectedBoard} = props;
	return (
		<form onSubmit={e => onAddTask(e, {
			id: +new Date(),
			boardId: selectedBoard.id,
			taskNumber: tasks.length + 1,
			title: taskValue,
			description: descriptionValue,
			createDate: new Date().toLocaleString('en-US'),
			progress: 'backlog'
		})}>
			<input type="text"
			       value={taskValue}
			       placeholder="enter task"
			       onChange={({target}) => onTitleChange(target.value)} />
			<textarea value={descriptionValue}
			          placeholder="enter task description"
			          onChange={({target}) => onDescriptionChange(target.value)} />
			<button>add task</button>
		</form>
	);
};

export default AddTask;