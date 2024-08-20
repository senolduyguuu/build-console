import { faker } from '@faker-js/faker';
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
			state.progress = (state.currentIndex / 6) * 100;
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

export const { addLog, completeBuild, resetBuild } = buildSlice.actions;

export const selectLogs = (state) => state.build.logs;
export const selectCompleted = (state) => state.build.completed;

export default buildSlice.reducer;


export const generateLog = () => {
	const currentTime = new Date().toLocaleTimeString();
	return {
		time: currentTime,
		type: faker.helpers.arrayElement(["stderr", "stdout"]),
		message: faker.hacker.phrase(),
		error: faker.datatype.boolean(),
		details: faker.lorem.sentence(),
	};
};

export const copyLogToClipboard = (log) => {
	const logText = `${log.time}: ${log.message}\nDetails: ${log.details}`;
	if (!navigator.clipboard) {
		alert("Clipboard API not supported by your browser");
		return;
	}

	navigator.clipboard.writeText(logText)
		.then(() => alert("Log copied to clipboard!"))
		.catch(err => alert("Failed to copy log: " + err));
};
