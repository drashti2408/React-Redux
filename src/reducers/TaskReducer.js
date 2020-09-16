import {
	CREATE_TASK,
	DELETE_TASK,
	EDIT_TASK,
	FETCH_TASK,
	FETCH_TASKS,
	TOGGLE_TASK_STATUS,
} from '../actions/type';

import _ from 'lodash';

export default (state = {}, action) => {
	switch (action.type) {
		case CREATE_TASK:
			console.log('@reducer', action.payload);
			return { ...state, [action.payload.id]: action.payload };
		case DELETE_TASK:
			return _.omit(state, action.payload);
		case EDIT_TASK:
			return { ...state, [action.payload.id]: action.payload };
		case FETCH_TASK:
			return { ...state, [action.payload.id]: action.payload };
		case FETCH_TASKS:
			return { ...state, ..._.mapKeys(action.payload, 'id') };
		case TOGGLE_TASK_STATUS:
			return { ...state, [action.payload.id]: action.payload };
		default:
			return state;
	}
};
