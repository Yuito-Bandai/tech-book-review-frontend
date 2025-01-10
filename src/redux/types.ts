import { ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';

export interface LoginResponse {
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface ErrorResponse {
  message: string;
}

export interface RootState {
  auth: any;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
