import React from 'react';
import { motion } from 'framer-motion';

import { Button } from '@midasit-dev/moaui';
import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { IListItem } from './defs/Interface';

interface ISelectionListProps {
	list: Array<IListItem>;
	onClick?: (item: IListItem) => void;
}

export const SelectionList = (props: ISelectionListProps) => {
	const { list, onClick } = props;

	return (
		<React.Fragment>
			{list &&
				list.length > 0 &&
				list.map((response: IListItem, index: number) => {
					return (
						<motion.div
							layout
							key={`AI-response-${response.functionId}`}
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
							<Card key={response.functionId} sx={{ width: '10rem', height: '7.5rem' }}>
								<CardContent>
									<Typography
										variant='body1'
										sx={{
											lineClamp: 2,
											wordBreak: 'break-all',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											cursor: 'default',
											userSelect: 'none',
										}}
									>
										{response.functionName}
									</Typography>
									<Typography variant='overline' sx={{ cursor: 'default', userSelect: 'none' }}>
										{String(response.score)}
									</Typography>
								</CardContent>
								<CardActions>
									<Button variant='text' onClick={() => onClick?.(response)}>
										Show
									</Button>
								</CardActions>
							</Card>
						</motion.div>
					);
				})}
		</React.Fragment>
	);
};

SelectionList.defaultProps = {
	list: [],
	onClick: () => {},
};

export default SelectionList;
