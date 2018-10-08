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

const BacklogTasks = props => {
	const {backlogTasks, connectDropTarget, hovered, onDrop} = props;
	return connectDropTarget(
		<div className={hovered ? 'backlog-list drop-hover' : 'backlog-list'}>
			{backlogTasks ? backlogTasks.map((task, i) => (
				                                 <Task
					                                 key={i}
					                                 id={task.id}
					                                 task={task}
					                                 ownPriority="backlog"
					                                 secondPriority="develop"
					                                 thirdPriority="test"
					                                 fourthPriority="done"
					                                 onDrop={onDrop} />
			                                 )
			) : null}
		</div>
	);
};

export default DropTarget('task', {}, collect)(BacklogTasks);