import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	logs: [],
	currentIndex: 0,
	progress: 0,
	paused: false,
	completed: false,
};

export const buildSlice = createSlice({
	name: 'build',
	initialState,
	reducers: {
		addLog: (state, action) => {
			state.logs.push(action.payload);
			state.currentIndex += 1;
			state.progress = (state.currentIndex / mockLogs.length) * 100;
		},
		togglePause: (state) => {
			state.paused = !state.paused;
		},
		completeBuild: (state) => {
			state.completed = true;
		},
		resetBuild: (state) => {
			state.logs = [];
			state.currentIndex = 0;
			state.progress = 0;
			state.paused = false;
			state.completed = false;
		},
	},
});

export const { addLog, togglePause, completeBuild, resetBuild } = buildSlice.actions;

export const selectLogs = (state) => state.build.logs;
export const selectProgress = (state) => state.build.progress;
export const selectPaused = (state) => state.build.paused;
export const selectCompleted = (state) => state.build.completed;

export default buildSlice.reducer;

const mockLogs = [
	"Initializing build environment...",
	"Fetching dependencies...",
	"Building project...",
	"Running tests...",
	"Deployment in progress...",
	"Build successful!",
];
