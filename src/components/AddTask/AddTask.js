import React from 'react';

const AddTask = props => {
	const {tasks, onInputChangeAdd, onAddTask, taskValue} = props;
	return (
		<form onSubmit={e => onAddTask(e, {
			id: +new Date(),
			taskNumber: tasks.length,
			title: taskValue,
			createDate: new Date().toLocaleString('en-US'),
			progress: 'backlog'
		})}>
			<input type="text"
			       value={taskValue}
			       placeholder="enter task"
			       onChange={({target}) => onInputChangeAdd(target.value)} />
			<button>add task</button>
		</form>
	);
};

export default AddTask;