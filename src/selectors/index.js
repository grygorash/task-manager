import { createSelector } from 'reselect';

export const getLoadingStatus = state => state.loaded;
export const getBoards = state => state.boards;
export const getSelectedBoard = state => state.selectedBoard;
export const getAllTasks = state => state.tasks;
export const getDevelopers = state => state.developers;

export const getActiveBoardTasks = createSelector(getSelectedBoard, getAllTasks, (board, tasks) => {
	return tasks ? tasks.filter(task => task.boardId === board.id) : null;
});

export const getTasksByProgress = createSelector(getActiveBoardTasks, tasks => {
	return {
		backlog: tasks ? tasks.filter(task => task.progress === 'backlog') : null,
		develop: tasks ? tasks.filter(task => task.progress === 'develop') : null,
		test: tasks ? tasks.filter(task => task.progress === 'test') : null,
		done: tasks ? tasks.filter(task => task.progress === 'done') : null
	};
});

export const getActiveBoardDevelopers = createSelector(getSelectedBoard, getDevelopers, (board, developers) => {
	return developers ? developers.filter(developer => developer.boardId === board.id) : null;
});

export const getBoardsStatus = createSelector(getBoards, boards => {
	return {
		open: boards ? boards.filter(board => board.status === 'open') : null,
		closed: boards ? boards.filter(board => board.status === 'closed') : null
	}
});