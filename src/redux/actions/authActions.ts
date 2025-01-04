import { Dispatch } from 'redux';
import { AppThunk } from '../types';
import { LoginResponse, ErrorResponse } from '../types';

export const login = (email: string, password: string): AppThunk => async (dispatch: Dispatch) => {
  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data: LoginResponse | ErrorResponse = await response.json();

  if (response.ok) {
    if ('user' in data) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
    }
  } else {
    if ('message' in data) {
      dispatch({ type: 'LOGIN_FAILURE', payload: data.message });
    }
  }
};
