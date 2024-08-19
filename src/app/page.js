"use client";

import { Box, Button, LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import BuildLogs from './BuildLogs';
import InfoCard from './InfoCard';
import { completeBuild, resetBuild, selectCompleted, selectPaused, selectProgress, togglePause } from './reducer/buildSlice';

export default function Home() {
	const dispatch = useDispatch();
	const progress = useSelector(selectProgress);
	const paused = useSelector(selectPaused);
	const completed = useSelector(selectCompleted);

	const handleStartBuild = () => {
		dispatch(resetBuild()); // Build'i sıfırla ve baştan başlat
	};

	const handleLogsComplete = () => {
		dispatch(completeBuild());
	};

	const handlePauseResume = () => {
		dispatch(togglePause());
	};

	return (
		<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#1e1e1e">
			{!completed && (
				<>
					<BuildLogs onComplete={handleLogsComplete} />
					<LinearProgress variant="determinate" value={progress} sx={{ width: '80%', mt: 2 }} />
					<Button variant="contained" onClick={handlePauseResume} sx={{ mt: 2 }}>
						{paused ? 'Resume' : 'Pause'}
					</Button>
				</>
			)}
			{completed && (
				<>
					<InfoCard />
					<Button variant="contained" onClick={handleStartBuild} sx={{ mt: 2 }}>
						Restart Build
					</Button>
				</>
			)}
		</Box>
	);
}
