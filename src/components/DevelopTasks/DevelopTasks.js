import React from 'react';
import DevelopTask from './DevelopTask/DevelopTask';
import { DropTarget } from 'react-dnd';

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		hovered: monitor.isOver(),
		task: monitor.getItem()
	};
}

const DevelopTasks = props => {
	const {developTasks, connectDropTarget, hovered, onDrop} = props;
	return connectDropTarget(
		<div className={hovered ? 'develop drop-hover' : 'develop'}>
			{developTasks ? developTasks.map((task, i) => (
				                                 <DevelopTask
					                                 key={i}
					                                 id={task.id}
					                                 task={task}
					                                 onDrop={onDrop} />
			                                 )
			) : null}
		</div>
	);
};

export default DropTarget('task', {}, collect)(DevelopTasks);