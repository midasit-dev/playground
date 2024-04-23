import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { FallbackProps } from 'react-error-boundary';

export interface IFallbackCardProps {
	key?: string | number;
	error?: Error;
	resetErrorBoundary?: () => void;
}

export function FallbackCard({ error, resetErrorBoundary }: IFallbackCardProps | FallbackProps) {
	return (
		<motion.div
			key={`ai-response-skeleton-${Math.random()}`}
			initial={{
				y: 100,
				opacity: 0,
			}}
			animate={{
				y: 0,
				opacity: 1,
			}}
			exit={{
				y: 100,
				opacity: 0,
			}}
			transition={{
				type: 'spring',
			}}
		>
			<Card
				sx={{ width: '16rem', height: '12rem' }}
				className='wrapper-box shadow-xl shadow-black/10 border border-pg-gray-medium rounded-md bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg'
			>
				<CardContent>
					<Typography variant='body1'>unable to obtain data.</Typography>
				</CardContent>
				<CardActions>
					<Button variant='text' onClick={resetErrorBoundary}>
						Retry
					</Button>
				</CardActions>
			</Card>
		</motion.div>
	);
}

export default FallbackCard;
