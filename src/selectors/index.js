import { createSelector } from 'reselect';

export const getLoadingStatus = state => state.loaded;
export const getTasks = state => state.tasks;

export const getBacklogTasks = createSelector(getTasks, tasks => {
	return tasks ? tasks.filter(task => task.progress === 'backlog') : null;
});

export const getDevelopTasks = createSelector(getTasks, tasks => {
	return tasks ? tasks.filter(task => task.progress === 'develop') : null;
});

export const getTestTasks = createSelector(getTasks, tasks => {
	return tasks ? tasks.filter(task => task.progress === 'test') : null;
});

export const getDoneTasks = createSelector(getTasks, tasks => {
	return tasks ? tasks.filter(task => task.progress === 'done') : null;
});