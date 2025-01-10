interface AuthState {
  user: null | { id: number; username: string; email: string };
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
