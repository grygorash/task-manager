import React from 'react';
import { DragSource } from 'react-dnd';
import moment from 'moment';

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
			<p className={`${ownPriority}-info`}>
				<span className={`${ownPriority}-value`}>Task №: </span>
				{task.taskNumber}
			</p>
			<p className={`${ownPriority}-info`}>
				<span className={`${ownPriority}-value`}>Title: </span>
				{task.title}
			</p>
			<p className={`${ownPriority}-info`}>
				<span className={`${ownPriority}-value`}>Description: </span>
				{task.description}
			</p>
			<p className={`${ownPriority}-info`}>
				<span className={`${ownPriority}-value`}>Developer: </span>
				{task.developer}
			</p>
			<p className={`${ownPriority}-info`}>
				<span className={`${ownPriority}-value`}>Start Date: </span>
				{moment(task.startDate).format("MMM Do YYYY")}
			</p>
			<p className={`${ownPriority}-info`}>
				<span className={`${ownPriority}-value`}>End Date: </span>
				{moment(task.endDate).format("MMM Do YYYY")}
			</p>
		</div>
	);
};

export default DragSource('task', taskSource, collect)(Task);