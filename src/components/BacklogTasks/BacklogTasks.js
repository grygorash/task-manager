import React from 'react';
import BacklogTask from './BacklogTask/BacklogTask';
import { DropTarget } from 'react-dnd';

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
		<div className={hovered ? 'backlog drop-hover' : 'backlog'}>
			{backlogTasks ? backlogTasks.map((task, i) => (
				                                 <BacklogTask
					                                 key={i}
					                                 id={task.id}
					                                 task={task}
					                                 onDrop={onDrop} />
			                                 )
			) : null}
		</div>
	);
};

export default DropTarget('task', {}, collect)(BacklogTasks);