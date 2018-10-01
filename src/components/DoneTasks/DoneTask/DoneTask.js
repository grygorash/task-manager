import React from 'react';
import { DragSource } from 'react-dnd';

const taskSource = {
	beginDrag(props) {
		return props.task;
	},
	endDrag(props, monitor) {
		if (!monitor.didDrop()) {
			return;
		}
		const selectedField = document.querySelectorAll(':hover');
		if (selectedField[selectedField.length - 1].className.match('backlog')) {
			return props.onDrop(props.task.id, 'backlog');
		} else if (selectedField[selectedField.length - 1].className.match('develop')) {
			return props.onDrop(props.task.id, 'develop');
		} else if (selectedField[selectedField.length - 1].className.match('test')) {
			return props.onDrop(props.task.id, 'test');
		}
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	};
}

const DoneTask = props => {
	const {task, isDragging, connectDragSource} = props;
	const opacity = isDragging ? 0 : 1;
	return connectDragSource(
		<div className="done-task" style={{opacity}}>
			<p>Task №: {task.taskNumber}</p>
			<p>Title: {task.title}</p>
			<p>Create Date: {task.createDate}</p>
		</div>
	);
};

export default DragSource('task', taskSource, collect)(DoneTask);