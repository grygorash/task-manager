import {
	ADD_TASK,
	CHANGE_PROGRESS,
	ADD_BOARD,
	SELECT_BOARD,
	FETCH_START,
	FETCH_LOCAL_SUCCESS,
	FETCH_FAILURE,
	FETCH_SUCCESS,
	ADD_DEV, CLOSE_BOARD
} from '../actionTypes';

export const fetchInitialState = () => async dispatch => {
	dispatch({type: FETCH_START});

	try {
		const boards = await [];
		const tasks = await [];
		const developers = await [];
		const selectedBoard = await {};
		if (!localStorage.getItem('boards')) {
			dispatch({
				         type: FETCH_SUCCESS,
				         boards,
				         tasks,
				         developers,
				         selectedBoard
			         });
		} else {
			dispatch({
				         type: FETCH_LOCAL_SUCCESS,
				         boards: JSON.parse(localStorage.getItem('boards')),
				         tasks: JSON.parse(localStorage.getItem('tasks')),
				         developers: JSON.parse(localStorage.getItem('developers')),
				         selectedBoard: JSON.parse(localStorage.getItem('selectedBoard'))
			         });
		}
	}
	catch (err) {
		dispatch({
			         type: FETCH_FAILURE,
			         payload: err,
			         error: true
		         });
	}
};

export const addSelectedBoard = board => {
	return {
		type: SELECT_BOARD,
		board
	};
};

export const addBoard = board => {
	return {
		type: ADD_BOARD,
		board
	};
};

export const addTask = (task) => {
	return {
		type: ADD_TASK,
		task
	};
};

export const addDev = developer => {
	return {
		type: ADD_DEV,
		developer
	};
};

export const changeProgress = (id, progress) => {
	return {
		type: CHANGE_PROGRESS,
		id,
		progress
	};
};

export const closeBoard = board => {
	return {
		type: CLOSE_BOARD,
		board
	};
};