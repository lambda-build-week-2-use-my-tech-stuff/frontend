import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGNED_IN,
  SIGNED_OUT
} from "../actions";

const initialState = {
  error: null,
  signingIn: false,
  signedIn: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        signingIn: true,
        error: null
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        signingIn: false,
        signedIn: true
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        signingIn: false,
        signedIn: false,
        error: action.payload
      };
    case SIGN_UP:
      return {
        ...state,
        signingIn: true,
        error: null
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signingIn: false,
        signedIn: true
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signingIn: false,
        signedIn: false,
        error: action.payload
      };
    case SIGNED_IN:
      return {
        ...state,
        signedIn: true
      };
    case SIGNED_OUT:
      return {
        ...state,
        signedIn: false
      };

    default:
      return state;
  }
};

export default reducer;
