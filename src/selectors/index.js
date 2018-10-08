import { createSelector } from 'reselect';

export const getLoadingStatus = state => state.loaded;
export const getBoards = state => state.boards;
export const getSelectedBoard = state => state.selectedBoard;
export const getTasks = state => state.tasks;
export const getDevelopers = state => state.developers;

export const getActiveTasks = createSelector(getSelectedBoard, getTasks, (board, tasks) => {
	return tasks ? tasks.filter(task => task.boardId === board.id) : null;
});

export const getActiveDevelopers = createSelector(getSelectedBoard, getDevelopers, (board, developers) => {
	return developers ? developers.filter(developer => developer.boardId === board.id) : null;
});

export const getBacklogTasks = createSelector(getActiveTasks, tasks => {
	return tasks ? tasks.filter(task => task.progress === 'backlog') : null;
});

export const getDevelopTasks = createSelector(getActiveTasks, tasks => {
	return tasks ? tasks.filter(task => task.progress === 'develop') : null;
});

export const getTestTasks = createSelector(getActiveTasks, tasks => {
	return tasks ? tasks.filter(task => task.progress === 'test') : null;
});

export const getDoneTasks = createSelector(getActiveTasks, tasks => {
	return tasks ? tasks.filter(task => task.progress === 'done') : null;
});