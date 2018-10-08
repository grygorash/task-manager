import React from 'react';
import { DropTarget } from 'react-dnd';
import Task from '../Task/Task';

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
		<div className={hovered ? 'develop-list drop-hover' : 'develop-list'}>
			{developTasks ? developTasks.map((task, i) => (
				                                 <Task
					                                 key={i}
					                                 id={task.id}
					                                 task={task}
					                                 ownPriority="develop"
					                                 secondPriority="backlog"
					                                 thirdPriority="test"
					                                 fourthPriority="done"
					                                 onDrop={onDrop} />
			                                 )
			) : null}
		</div>
	);
};

export default DropTarget('task', {}, collect)(DevelopTasks);