import initialState from "./initialState"

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DATA_REQUEST':
        return { ...state, isLoading: true, error: null };
      case 'FETCH_DATA_SUCCESS':
        return { ...state, data: action.payload, isLoading: false };
      case 'FETCH_DATA_FAILURE':
        return { ...state, error: action.payload, isLoading: false };
      case 'POST_DATA_REQUEST':
        return { ...state, isLoading: true, error: null };
      case 'POST_DATA_SUCCESS':
        return { ...state, data: [...state.data, action.payload], isLoading: false };
      case 'POST_DATA_FAILURE':
        return { ...state, error: action.payload, isLoading: false };
      case 'DELETE_DATA_REQUEST':
        return {...state, loading: true, error: null };
      case 'DELETE_DATA_SUCCESS':
        return {...state, loading: false, data: state.data.filter(task => task._id !== action.payload) };
      case 'DELETE_DATA_FAILURE':
        return {...state, loading: false, error: action.payload };
      case 'EDIT_TASK_REQUEST':
        return {...state, loading: true, error: null };
      case 'EDIT_TASK_SUCCESS':
        return {...state, loading: false, data: state.data.map(task => task._id === action.payload._id ? action.payload : task )};
      case 'EDIT_TASK_FAILURE':
        return {...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

export default reducer