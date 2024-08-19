import { Box, Card, CardContent, Typography } from '@mui/material';

const InfoCard = () => {
	return (
		<Card sx={{ maxWidth: 400, mt: 4, bgcolor: '#f5f5f5' }}>
			<CardContent>
				<Typography variant="h5" sx={{ mb: 2 }}>
					Build Information
				</Typography>
				<Box sx={{ bgcolor: '#fff', p: 2 }}>
					<Typography variant="body2">Domain: example.com</Typography>
					<Typography variant="body2">Last Commit: abc123def456</Typography>
					<Typography variant="body2">Status: Successful</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default InfoCard;
