import * as dotProp from 'dot-prop-immutable';

import { ADD_TASK, CHANGE_PROGRESS, FETCH_LOCAL_TASKS_SUCCESS, FETCH_TASKS_SUCCESS } from '../actionTypes';

const initialState = {
	loaded: false
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_TASKS_SUCCESS:
			return {...state, tasks: action.tasks, loaded: true};

		case FETCH_LOCAL_TASKS_SUCCESS:
			return {...state, tasks: action.tasks, loaded: true};

		case ADD_TASK:
			return {...state, tasks: [...state.tasks, action.task]};

		case CHANGE_PROGRESS:
			const changeTaskIndex = state.tasks.findIndex(task => task.id === action.id);
			return dotProp.set(state, `tasks.${changeTaskIndex}.progress`, action.progress);

		default:
			return state;
	}
}