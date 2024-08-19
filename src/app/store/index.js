import { configureStore } from '@reduxjs/toolkit';
import buildReducer from '../reducer/buildSlice';

export const store = configureStore({
	reducer: {
		build: buildReducer,
	},
});

export default store;
