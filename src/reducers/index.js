import * as dotProp from 'dot-prop-immutable';

import {
	ADD_BOARD,
	ADD_DEV,
	ADD_TASK,
	CHANGE_PROGRESS, CLOSE_BOARD,
	FETCH_LOCAL_SUCCESS,
	FETCH_SUCCESS,
	SELECT_BOARD
} from '../actionTypes';
import moment from 'moment';

const initialState = {};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_SUCCESS:
			return {
				...state,
				boards: action.boards,
				tasks: action.tasks,
				developers: action.developers,
				selectedBoard: action.selectedBoard,
				loaded: true
			};

		case FETCH_LOCAL_SUCCESS:
			return {
				...state,
				boards: action.boards,
				tasks: action.tasks,
				developers: action.developers,
				selectedBoard: action.selectedBoard,
				loaded: true
			};

		case SELECT_BOARD:
			return {
				...state,
				selectedBoard: action.board
			};

		case ADD_BOARD:
			return {
				...state,
				boards: [...state.boards, action.board]
			};

		case ADD_TASK:
			const endDate = [];
			const newTasks = state.tasks;
			newTasks.push(action.task);
			newTasks.map(task => endDate.push(moment(task.endDate).format()));
			const boardIndex = state.boards.findIndex(board => board.id === action.task.boardId);
			const tasks = dotProp.set(state, 'tasks', tasks => [...tasks]);
			const boards = dotProp.set(tasks, `boards.${boardIndex}.endDate`, endDate[endDate.length - 1]);
			return dotProp.set(boards, `selectedBoard.endDate`, endDate[endDate.length - 1]);

		case ADD_DEV:
			return {
				...state,
				developers: [...state.developers, action.developer]
			};

		case CHANGE_PROGRESS:
			const changeTaskIndex = state.tasks.findIndex(task => task.id === action.id);
			return dotProp.set(state, `tasks.${changeTaskIndex}.progress`, action.progress);

		case CLOSE_BOARD:
			const closeBoardIndex = state.boards.findIndex(board => board.id === action.board.id);
			return dotProp.set(state, `boards.${closeBoardIndex}.status`, 'closed');

		default:
			return state;
	}
}