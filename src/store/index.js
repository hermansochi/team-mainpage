import { configureStore } from '@reduxjs/toolkit';
//import appSettingsSlice from './appSettingsSlice';
import githubReducer from './githubSlice';
//import callReducer from './callSlice';
//import loginSlice from './loginSlice';
//import usersSlice from './usersSlice';

export const store = configureStore({
  reducer: {
    github: githubReducer
  },
});
