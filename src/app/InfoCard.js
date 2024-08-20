import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLogs } from './reducer/buildSlice';

const InfoCard = () => {
	const logs = useSelector(selectLogs);

	return (
		<Card
			sx={{
				maxWidth: 600,
				mt: 4,
				bgcolor: '#2E2D35', // Koyu arka plan
				boxShadow: 4,
				borderRadius: 3,
				p: 2,
			}}
		>
			<CardContent>
				<Typography
					variant="h5"
					sx={{
						mb: 2,
						color: '#ffffff', // Beyaz başlık
						fontWeight: 'bold',
					}}
				>
					Deploy Log
				</Typography>
				<Typography
					variant="subtitle2"
					sx={{
						mb: 2,
						color: '#BDBDBD', // Açık gri alt başlık
					}}
				>
					Commit: c4ca4238a
				</Typography>
				<Divider sx={{ mb: 2, bgcolor: '#616161' }} />
				<Box
					sx={{
						bgcolor: '#3e3e44', // Loglar için koyu gri arka plan
						p: 2,
						borderRadius: 2,
						maxHeight: 300,
						overflowY: 'auto',
					}}
				>
					{logs.map((log, index) => (
						<Box key={index} sx={{ mb: 2 }}>
							<Typography
								variant="body2"
								sx={{
									color: '#ffffff', // Beyaz metin
								}}
							>
								<strong>{log.time}</strong>: {log.message}
							</Typography>
							<Typography
								variant="caption"
								sx={{
									color: log.error ? '#e57373' : '#81c784', // Hata: Kırmızı, Başarı: Yeşil
									fontStyle: 'italic',
								}}
							>
								{log.error ? 'Error' : 'Success'}
							</Typography>
						</Box>
					))}
				</Box>
			</CardContent>
		</Card>
	);
};

export default InfoCard;
