import { GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAILURE, GET_POST, GET_POST_SUCCESS, GET_POST_FAILURE, ADD_POST, ADD_POST_SUCCESS, ADD_POST_FAILURE, SEARCH } from '../actions';

const initialState = {
  posts: [],
  post: {},
  fetchingPosts: false,
  fetchingPost: false,
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
      posts: action.payload,
      fetchingPosts: false
    }
    case GET_POSTS_FAILURE:
    return {
      ...state,
      fetchingPosts: false,
      error: action.payload
    }
    case GET_POST:
    return {
      ...state,
      fetchingPost: true,
      error: null
    }
    case GET_POST_SUCCESS:
    return {
      ...state,
      post: action.payload,
      fetchingPost: false
    }
    case GET_POST_FAILURE:
    return {
      ...state,
      fetchingPost: false,
      error: action.payload
    }
    case ADD_POST:
    return {
      ...state,
      addingPost: true,
      error: null
    }
    case ADD_POST_SUCCESS:
    return {
      ...state,
      addingPost: false
    }
    case ADD_POST_FAILURE:
    return {
      ...state,
      addingPost: false,
      error: action.payload
    }
    case SEARCH:
    const filteredPosts = state.posts.filter(post => {
      return post.includes(state.searched)
    })
    return {
      ...state, 
      searched: action.payload,
      posts: filteredPosts
    }
    default:
      return state;
  }
};

export default reducer;
