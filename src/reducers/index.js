import { GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAILURE } from '../actions';

const initialState = {
  posts: [],
  fetchingPosts: false,
  addingPost: false,
  updatingPost: false,
  deletingPost: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
    return {
      ...state,
      fetchingPosts: true,
      error: null
    }
    case GET_POSTS_SUCCESS:
    return {
      ...state,
      posts: [...state.posts, ...action.payload],
      fetchingPosts: false
    }
    case GET_POSTS_FAILURE:
    return {
      ...state,
      fetchingPosts: false,
      error: action.payload
    }
    default:
      return state;
  }
};

export default reducer;
