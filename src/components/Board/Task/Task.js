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
		if (selectedField[selectedField.length - 1].className.match(`${props.secondPriority}`)) {
			return props.onDrop(props.task.id, `${props.secondPriority}`);
		} else if (selectedField[selectedField.length - 1].className.match(`${props.thirdPriority}`)) {
			return props.onDrop(props.task.id, `${props.thirdPriority}`);
		} else if (selectedField[selectedField.length - 1].className.match(`${props.fourthPriority}`)) {
			return props.onDrop(props.task.id, `${props.fourthPriority}`);
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

const Task = props => {
	const {task, isDragging, connectDragSource, ownPriority} = props;
	const opacity = isDragging ? 0 : 1;
	return connectDragSource(
		<div className={`${ownPriority}-task`} style={{opacity}}>
			<p><span>Task №:</span> {task.taskNumber}</p>
			<p><span>Title:</span> {task.title}</p>
			<p><span>Description:</span> {task.description}</p>
			<p><span>Create Date:</span> {task.createDate}</p>
		</div>
	);
};

export default DragSource('task', taskSource, collect)(Task);