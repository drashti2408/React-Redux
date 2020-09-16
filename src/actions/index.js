import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_TASK,
	DELETE_TASK,
	EDIT_TASK,
	FETCH_TASK,
	FETCH_TASKS,
	TOGGLE_TASK_STATUS,
} from './type';
import tasks from '../apis/tasks';
import history from '../history';

export const signIn = (userId, userName) => {
	return {
		type: SIGN_IN,
		payload: { userId, userName },
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT,
	};
};
export const createTask = (formValues) => async (dispatch, getState) => {
	const { userId, userName } = getState().auth;
	const createdAt = new Date().getTime();
	const response = await tasks.post('/tasks', {
		...formValues,
		userId,
		userName,
		completed: false,
		createdAt,
	});
	console.log('------->>>>>>', { ...response.data });
	dispatch({
		type: CREATE_TASK,
		payload: { ...response.data, userName, completed: false, createdAt },
	});
	history.push('/');
};

export const deleteTask = (id) => async (dispatch) => {
	await tasks.delete(`/tasks/${id}`);
	dispatch({ type: DELETE_TASK, payload: id });
	history.push('/');
};

export const editTask = (id, formValues) => async (dispatch) => {
	const response = await tasks.patch(`/tasks/${id}`, formValues);
	dispatch({ type: EDIT_TASK, payload: response.data });
	history.push('/');
};

export const fetchTask = (id) => async (dispatch) => {
	const response = await tasks.get(`/tasks/${id}`);
	dispatch({ type: FETCH_TASK, payload: response.data });
};

export const fetchTasks = () => async (dispatch) => {
	const response = await tasks.get('/tasks');
	dispatch({ type: FETCH_TASKS, payload: response.data });
};

export const toggleTaskStatus = (task) => async (dispatch) => {
	const response = await tasks.get(`/tasks/${task.id}`);
	const updatedTask = { ...response.data, completed: !task.completed };
	dispatch({ type: TOGGLE_TASK_STATUS, payload: updatedTask });
};
