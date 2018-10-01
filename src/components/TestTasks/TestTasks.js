import React from 'react';
import TestTask from './TestTask/TestTask';
import { DropTarget } from 'react-dnd';

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
		<div className={hovered ? 'test drop-hover' : 'test'}>
			{testTasks ? testTasks.map((task, i) => (
				                           <TestTask
					                           key={i}
					                           id={task.id}
					                           task={task}
					                           onDrop={onDrop} />
			                           )
			) : null}
		</div>
	);
};

export default DropTarget('task', {}, collect)(TestTasks);