import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL || '';

export const fetchDataRequest = () => ({ type: 'FETCH_DATA_REQUEST' });
export const fetchDataSuccess = (data) => ({ type: 'FETCH_DATA_SUCCESS', payload: data });
export const fetchDataFailure = (error) => ({ type: 'FETCH_DATA_FAILURE', payload: error });

export const postDataRequest = () => ({ type: 'POST_DATA_REQUEST' });
export const postDataSuccess = (data) => ({ type: 'POST_DATA_SUCCESS', payload: data });
export const postDataFailure = (error) => ({ type: 'POST_DATA_REQUEST', payload: error });

export const deleteDataRequest = () => ({ type: 'DELETE_DATA_REQUEST' });
export const deleteDataSuccess = (taskId) => ({ type: 'DELETE_DATA_SUCCESS', payload: taskId });
export const deleteDataFailure = (error) => ({ type: 'DELETE_DATA_REQUEST', payload: error });

export const editTaskRequest = () => ({type: 'EDIT_TASK_REQUEST'});
export const editTaskSuccess = (task) => ({ type: 'EDIT_TASK_SUCCESS', payload: task });
export const editTaskFailure = (error) => ({ type: 'EDIT_TASK_FAILURE', payload: error });

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get(apiUrl + '/api/v1/tasks');
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

export const postData = (url, payload) => {
  return async (dispatch) => {
    dispatch(postDataRequest());
    try {
      const response = await fetch(apiUrl + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      dispatch(postDataSuccess(data));
    } catch (error) {
      dispatch(postDataFailure(error.message));
    }
  }
}

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch(deleteDataRequest());

  try {
    await axios.delete(apiUrl + `${'/api/v1/tasks/delete'}/${taskId}`);
    dispatch(deleteDataSuccess(taskId));
  } catch (error) {
    dispatch(deleteDataFailure(error.message));
  }
};

export const editTask = (taskId, updatedTaskData) => {
  return async (dispatch) => {
    dispatch(editTaskRequest());

    try {
      const response = await fetch(apiUrl + `/api/v1/tasks/update/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTaskData)
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      dispatch(editTaskSuccess(updatedTask));
    } catch (error) {
      dispatch(editTaskFailure(error.message));
    }
  };
};

