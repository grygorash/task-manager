import React from 'react';
import { DropTarget } from 'react-dnd';
import Task from '../Task/Task';

const collect = function(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		hovered: monitor.isOver(),
		task: monitor.getItem()
	};
};

const DoneTasks = props => {
	const {doneTasks, connectDropTarget, hovered, onDrop, onSelectTask} = props;
	return connectDropTarget(
		<div className={hovered ? 'done-list drop-hover' : 'done-list'}>
			{doneTasks ? doneTasks.map((task, i) => (
				                           <Task
					                           key={i}
					                           id={task.id}
					                           task={task}
					                           ownPriority="done"
					                           secondPriority="backlog"
					                           thirdPriority="develop"
					                           fourthPriority="test"
					                           onDrop={onDrop}
					                           onSelectTask={onSelectTask}/>
			                           )
			) : null}
		</div>
	);
};

export default DropTarget('task', {}, collect)(DoneTasks);