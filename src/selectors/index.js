import { createSelector } from 'reselect';

export const getLoadingStatus = state => state.loaded;
export const getBoards = state => state.boards;
export const getSelectedBoard = state => state.selectedBoard;
export const getSelectedTask = state => state.selectedTask;
export const getAllTasks = state => state.tasks;
export const getDevelopers = state => state.developers;

export const getActiveBoardTasks = createSelector(getSelectedBoard, getAllTasks, (board, tasks) => {
	return tasks.filter(task => task.boardId === board.id);
});

export const getTasksByProgress = createSelector(getActiveBoardTasks, tasks => {
	return {
		backlog: tasks.filter(task => task.progress === 'backlog'),
		develop: tasks.filter(task => task.progress === 'develop'),
		test: tasks.filter(task => task.progress === 'test'),
		done: tasks.filter(task => task.progress === 'done')
	};
});

export const getTasksByFilter = createSelector(getSelectedBoard, getActiveBoardTasks, (board, tasks) => {
	if (board.filterByPriority === 'none' && board.filterByDeveloper !== 'none') {
		return {
			backlog: tasks.filter(task => task.progress === 'backlog').filter(task => task.developer === board.filterByDeveloper),
			develop: tasks.filter(task => task.progress === 'develop').filter(task => task.developer === board.filterByDeveloper),
			test: tasks.filter(task => task.progress === 'test').filter(task => task.developer === board.filterByDeveloper),
			done: tasks.filter(task => task.progress === 'done').filter(task => task.developer === board.filterByDeveloper)
		};
	} else if (board.filterByDeveloper === 'none' && board.filterByPriority !== 'none') {
		return {
			backlog: tasks.filter(task => task.progress === 'backlog').filter(task => task.priority === board.filterByPriority),
			develop: tasks.filter(task => task.progress === 'develop').filter(task => task.priority === board.filterByPriority),
			test: tasks.filter(task => task.progress === 'test').filter(task => task.priority === board.filterByPriority),
			done: tasks.filter(task => task.progress === 'done').filter(task => task.priority === board.filterByPriority)
		};
	} else if (board.filterByDeveloper !== 'none' && board.filterByPriority !== 'none') {
		return {
			backlog: tasks.filter(task => task.progress === 'backlog').filter(task => task.priority === board.filterByPriority).filter(task => task.developer === board.filterByDeveloper),
			develop: tasks.filter(task => task.progress === 'develop').filter(task => task.priority === board.filterByPriority).filter(task => task.developer === board.filterByDeveloper),
			test: tasks.filter(task => task.progress === 'test').filter(task => task.priority === board.filterByPriority).filter(task => task.developer === board.filterByDeveloper),
			done: tasks.filter(task => task.progress === 'done').filter(task => task.priority === board.filterByPriority).filter(task => task.developer === board.filterByDeveloper)
		};
	} else {
		return {
			backlog: tasks.filter(task => task.progress === 'backlog'),
			develop: tasks.filter(task => task.progress === 'develop'),
			test: tasks.filter(task => task.progress === 'test'),
			done: tasks.filter(task => task.progress === 'done')
		};
	}
});

export const getActiveBoardDevelopers = createSelector(getSelectedBoard, getDevelopers, (board, developers) => {
	return developers.filter(developer => developer.boardId === board.id);
});

export const getBoardsStatus = createSelector(getBoards, boards => {
	return {
		open: boards.filter(board => board.status === 'open'),
		closed: boards.filter(board => board.status === 'closed')
	};
});