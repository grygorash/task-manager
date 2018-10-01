import {
	FETCH_TASKS_START,
	FETCH_TASKS_SUCCESS,
	FETCH_LOCAL_TASKS_SUCCESS,
	FETCH_TASKS_FAILURE,
	ADD_TASK, CHANGE_PROGRESS
} from '../actionTypes';

export const fetchTasks = () => async dispatch => {
	dispatch({type: FETCH_TASKS_START});

	try {
		const tasks = await [];
		if (!localStorage.getItem('tasks')) {
			dispatch({
				         type: FETCH_TASKS_SUCCESS,
				         tasks
			         });
		} else {
			dispatch({
				         type: FETCH_LOCAL_TASKS_SUCCESS,
				         tasks: JSON.parse(localStorage.getItem('tasks'))
			         });
		}
	}

	catch (err) {
		dispatch({
			         type: FETCH_TASKS_FAILURE,
			         payload: err,
			         error: true
		         });
	}

};

export const addTask = task => {
	return {
		type: ADD_TASK,
		task
	};
};

export const changeProgress = (id, progress) => {
	return {
		type: CHANGE_PROGRESS,
		id,
		progress
	};
};