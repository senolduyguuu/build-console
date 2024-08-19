"use client";

import { Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLog, selectLogs, selectPaused } from './reducer/buildSlice';

const mockLogs = [
	"Initializing build environment...",
	"Fetching dependencies...",
	"Building project...",
	"Running tests...",
	"Deployment in progress...",
	"Build successful!",
];

const BuildLogs = ({ onComplete }) => {
	const dispatch = useDispatch();
	const logs = useSelector(selectLogs);
	const paused = useSelector(selectPaused);
	const currentIndex = logs.length;

	useEffect(() => {
		if (!paused && currentIndex < mockLogs.length) {
			const timeout = setTimeout(() => {
				dispatch(addLog(mockLogs[currentIndex]));
				if (currentIndex + 1 === mockLogs.length) {
					onComplete();
				}
			}, 1000);
			return () => clearTimeout(timeout);
		}
	}, [currentIndex, paused, dispatch, onComplete]);

	return (
		<Paper elevation={3} sx={{ p: 2, width: '80%', bgcolor: '#1e1e1e', color: '#00ff00', overflowY: 'auto', maxHeight: '50vh' }}>
			{logs.map((log, index) => (
				<Typography key={index} variant="body1" sx={{ fontFamily: 'monospace' }}>
					{log}
				</Typography>
			))}
		</Paper>
	);
};

export default BuildLogs;
