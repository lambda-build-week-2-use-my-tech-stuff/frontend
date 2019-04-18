import {
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE
} from "../actions";

const initialState = {
  error: null,
  currentProfile: null,
  fetchingProfile: false,
  editingProfile: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        fetchingProfile: true,
        error: null
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        fetchingProfile: false,
        currentProfile: action.payload
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        fetchingProfile: false,
        error: action.payload
      };
    case EDIT_PROFILE:
      return {
        ...state,
        editingProfile: true,
        error: null
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        editingProfile: false,
        currentProfile: action.payload
      };
    case EDIT_PROFILE_FAILURE:
      return {
        ...state,
        editingProfile: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
