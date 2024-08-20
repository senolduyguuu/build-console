"use client";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Collapse, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

export default function BuildLogOwerview() {
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	// Kopyalama işlevi
	const handleCopyText = (text) => {
		if (!navigator.clipboard) {
			alert('Clipboard API not supported by your browser');
			return;
		}
		navigator.clipboard.writeText(text)
			.then(() => alert("Text copied to clipboard!"))
			.catch(err => alert("Failed to copy text: " + err));
	};

	return (
		<Box sx={{ width: '100%', maxWidth: 770, bgcolor: '#2c2c2c', color: '#fff', padding: '10px' }}>
			<Typography variant="h6" sx={{ mb: 2 }}>
				Overview
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
				<Box>
					<Typography variant="body2" sx={{ color: '#888888' }}>
						Public URL
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography variant="body1" sx={{ color: '#00ff00' }}>
							raw-pony-personal-recep-13309e3c...
						</Typography>
						<IconButton
							sx={{ color: '#888888', ml: 1 }}
							onClick={() => handleCopyText("raw-pony-personal-recep-13309e3c...")}
						>
							<ContentCopyIcon />
						</IconButton>
					</Box>
				</Box>
				<Box>
					<Typography variant="body2" sx={{ color: '#888888' }}>
						Private Address
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography variant="body1" sx={{ color: '#fff' }}>
							nextjs.raw-pony.internal:8000
						</Typography>
						<IconButton
							sx={{ color: '#888888', ml: 1 }}
							onClick={() => handleCopyText("nextjs.raw-pony.internal:8000")}
						>
							<ContentCopyIcon />
						</IconButton>
					</Box>
				</Box>
			</Box>
			<Button
				onClick={handleExpandClick}
				endIcon={<ExpandMoreIcon />}
				sx={{ color: '#00ff00', textTransform: 'none' }}
			>
				Deployment details
			</Button>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<Box sx={{ mt: 2 }}>
					<Typography variant="body2" sx={{ color: '#cccccc' }}>
						Additional deployment information goes here...
					</Typography>
				</Box>
			</Collapse>
		</Box>
	);
}
