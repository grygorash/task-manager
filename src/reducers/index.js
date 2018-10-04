import * as dotProp from 'dot-prop-immutable';

import {
	ADD_BOARD,
	ADD_TASK,
	CHANGE_PROGRESS,
	FETCH_LOCAL_SUCCESS, FETCH_SUCCESS,
	SELECT_BOARD
} from '../actionTypes';

const initialState = {};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_SUCCESS:
			return {...state, boards: action.boards, tasks: action.tasks, selectedBoard: action.selectedBoard, loaded: true};

		case FETCH_LOCAL_SUCCESS:
			return {...state, boards: action.boards, tasks: action.tasks, selectedBoard: action.selectedBoard, loaded: true};

		case SELECT_BOARD:
			return {...state, selectedBoard: action.board};

		case ADD_BOARD:
			return {...state, boards: [...state.boards, action.board]};

		case ADD_TASK:
			return {...state, tasks: [...state.tasks, action.task]};

		case CHANGE_PROGRESS:
			const changeTaskIndex = state.tasks.findIndex(task => task.id === action.id);
			return dotProp.set(state, `tasks.${changeTaskIndex}.progress`, action.progress);

		default:
			return state;
	}
}