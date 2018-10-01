import React from 'react';
import DoneTask from './DoneTask/DoneTask';
import { DropTarget } from 'react-dnd';

const collect = function(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		hovered: monitor.isOver(),
		task: monitor.getItem()
	};
};

const DoneTasks = props => {
	const {doneTasks, connectDropTarget, hovered, onDrop} = props;
	return connectDropTarget(
		<div className={hovered ? 'done drop-hover' : 'done'}>
			{doneTasks ? doneTasks.map((task, i) => (
				                           <DoneTask
					                           key={i}
					                           id={task.id}
					                           task={task}
					                           onDrop={onDrop} />
			                           )
			) : null}
		</div>
	);
};

export default DropTarget('task', {}, collect)(DoneTasks);