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

const TestTasks = props => {
	const {testTasks, connectDropTarget, hovered, onDrop} = props;
	return connectDropTarget(
		<div className={hovered ? 'test-list drop-hover' : 'test-list'}>
			{testTasks ? testTasks.map((task, i) => (
				                           <Task
					                           key={i}
					                           id={task.id}
					                           task={task}
					                           ownPriority="test"
					                           secondPriority="backlog"
					                           thirdPriority="develop"
					                           fourthPriority="done"
					                           onDrop={onDrop} />
			                           )
			) : null}
		</div>
	);
};

export default DropTarget('task', {}, collect)(TestTasks);