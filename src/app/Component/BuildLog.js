"use client";

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { Box, Button, Card, CardContent, Divider, IconButton, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoCard from '../InfoCard';
import { addLog, completeBuild, generateLog, resetBuild, selectCompleted, selectLogs } from '../reducer/buildSlice';
import BuildLogOwerview from './BuildLogOverview';

export default function BuildLog() {
	const dispatch = useDispatch();
	const logs = useSelector(selectLogs);
	const completed = useSelector(selectCompleted);
	const [currentLogIndex, setCurrentLogIndex] = useState(0);

	const logStages = ["Cloning Repository", "Building Project", "Running Tests", "Deployment in Progress", "Finalizing", "Build Completed"];

	useEffect(() => {
		dispatch(resetBuild());
	}, [dispatch]);

	useEffect(() => {
		if (currentLogIndex < 6) {
			const timeout = setTimeout(() => {
				dispatch(addLog(generateLog()));
				setCurrentLogIndex(currentLogIndex + 1);

				if (currentLogIndex + 1 === 6) {
					dispatch(completeBuild());
				}
			}, 2000);

			return () => clearTimeout(timeout);
		}
	}, [currentLogIndex, dispatch]);

	// Logları yeniden yükleme işlevi
	const handleReloadLogs = () => {
		dispatch(resetBuild());
		setCurrentLogIndex(0);
	};

	// Tüm logları panoya kopyalama işlevi
	const handleCopyAllLogs = () => {
		const allLogsText = logs.map(log => `${log.time}: ${log.message}\nDetails: ${log.details}`).join('\n\n');
		if (navigator.clipboard) {
			navigator.clipboard.writeText(allLogsText)
				.then(() => alert("All logs copied to clipboard!"))
				.catch(err => alert("Failed to copy logs: " + err));
		} else {
			alert("Clipboard API not supported by your browser");
		}
	};

	// Tüm logları bir dosya olarak indirme işlevi
	const handleDownloadLogs = () => {
		const allLogsText = logs.map(log => `${log.time}: ${log.message}\nDetails: ${log.details}`).join('\n\n');
		const blob = new Blob([allLogsText], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'build_logs.txt';
		a.click();
		URL.revokeObjectURL(url);
	};

	// Logları temizleme işlevi
	const handleClearLogs = () => {
		dispatch(resetBuild());
		setCurrentLogIndex(0);
	};

	// İlerleme yüzdesi hesaplama
	const progress = (currentLogIndex / 6) * 100;

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', backgroundColor: '#1e1e1e', minHeight: '100vh' }}>
			{!completed && <BuildLogOwerview />}
			{!completed && (
				<Card sx={{ width: '100%', maxWidth: 770, backgroundColor: '#2c2c2c', color: '#fff', boxShadow: 'none' }}>
					<CardContent>
						<Typography variant="h6" gutterBottom>
							Build Logs
						</Typography>
						<Divider sx={{ backgroundColor: '#3a3a3a', marginBottom: '10px' }} />
						{/* Durum Metni */}
						<Typography variant="body1" sx={{ color: '#00ff00', mb: 2 }}>
							{logStages[currentLogIndex] || "Build Completed"}
						</Typography>
						{/* Loglar */}
						<Box className="log-container" sx={{ maxHeight: 200, overflowY: 'auto' }}>
							{logs.map((log, index) => (
								<Box key={index} sx={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<Typography variant="body2" sx={{ color: '#888888', marginRight: '10px' }}>{log.time}</Typography>
										<Typography variant="body2" sx={{ color: log.error ? '#ff5555' : '#00ff00', marginRight: '10px' }}>{log.type}</Typography>
										<Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{log.message}</Typography>
									</Box>
									{log.details && (
										<Typography variant="body2" sx={{ color: '#cccccc', marginLeft: '10px', fontStyle: 'italic' }}>
											{log.details}
										</Typography>
									)}
								</Box>
							))}
						</Box>
						{/* İlerleme Çubuğu ve Yüzde */}
						<Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
							<LinearProgress variant="determinate" value={progress} sx={{ width: '100%', mr: 2 }} />
							<Typography variant="body2" sx={{ color: '#00ff00' }}>{Math.round(progress)}%</Typography>
						</Box>
						<Divider sx={{ backgroundColor: '#3a3a3a', margin: '10px 0' }} />
						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Box>
								<Button
									startIcon={<RefreshOutlinedIcon />}
									color="primary"
									sx={{ color: '#00ff00', textTransform: 'none' }}
									onClick={handleReloadLogs}
								>
									Reload Logs
								</Button>
								<Button
									startIcon={<DeleteOutlineOutlinedIcon />}
									color="primary"
									sx={{ color: '#ff5555', textTransform: 'none', ml: 2 }}
									onClick={handleClearLogs}
								>
									Clear Logs
								</Button>
							</Box>
							<Box>
								<IconButton color="primary" sx={{ color: '#00ff00' }} onClick={handleCopyAllLogs}>
									<FileCopyOutlinedIcon />
								</IconButton>
								<IconButton color="primary" sx={{ color: '#00ff00' }} onClick={handleDownloadLogs}>
									<GetAppOutlinedIcon />
								</IconButton>
							</Box>
						</Box>
					</CardContent>
				</Card>
			)}
			{completed && <InfoCard />}
		</Box>
	);
}
