import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Stack, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

export interface IContentLoadingSkeletonProps {
	items?: number;
}

export const ContentLoadingSkeleton = React.forwardRef(
	(props: IContentLoadingSkeletonProps, ref: any) => {
		const repeater = React.useMemo(() => Array.from({ length: props?.items || 3 }), [props?.items]);

		return (
			<Stack direction='row' spacing={2} ref={ref}>
				{repeater.map((value: any, index: number) => {
					return (
						<motion.div
							layout
							key={`ai-response-skeleton-${index}`}
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
								delay: index * 0.1,
								type: 'spring',
								duration: 0.5,
							}}
						>
							<Card sx={{ width: '16rem', height: '12rem' }}>
								<CardContent>
									<Skeleton variant='text' width='100%' />
									<Skeleton variant='text' width='100%' />
								</CardContent>
							</Card>
						</motion.div>
					);
				})}
			</Stack>
		);
	},
);
