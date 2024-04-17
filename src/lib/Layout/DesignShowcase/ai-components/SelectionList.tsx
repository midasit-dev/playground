import React from 'react';
import { motion } from 'framer-motion';

import { Button, Panel, Separator } from '@midasit-dev/moaui';
import { Typography, Stack } from '@mui/material';
import { IListItem } from './defs/Interface';
import { max } from 'lodash';

interface ISelectionListProps {
	list: Array<IListItem>;
	onClick?: (item: IListItem) => void;
}

const noDragTextArea = {
	cursor: 'default',
	userSelect: 'none',
};

const scoreColors: string[] = ['linear-gradient(to right, #642B73, #c6426e)', '#000'];

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
							<Panel width='16rem' height='12rem' padding={2} key={response.functionId}>
								<Stack justifyContent='space-between' direction='column' height='100%'>
									<Stack direction='row' justifyContent='space-between'>
										<Stack>
											<Typography sx={noDragTextArea}>{`Suggestion`}</Typography>
											<Typography
												variant='subtitle2'
												sx={{
													...noDragTextArea,
													fontWeight: 'bold',
													lineHeight: '0.875',
												}}
											>
												{`No. ${index + 1}`}
											</Typography>
										</Stack>
										<Stack direction='column'>
											<Typography sx={noDragTextArea}>{`Score`}</Typography>
											<Typography
												variant='subtitle2'
												sx={{
													...noDragTextArea,
													fontWeight: 'bold',
													lineHeight: '0.875',
													background: scoreColors[Math.min(index, scoreColors.length - 1)],
													WebkitBackgroundClip: 'text',
													WebkitTextFillColor: 'transparent',
												}}
											>
												{`${String(response.score * 100)}%`}
											</Typography>
										</Stack>
									</Stack>
									<Typography
										variant='subtitle1'
										sx={{
											WebkitLineClamp: 2,
											wordBreak: 'break-all',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											'-webkit-box-orient': 'vertical',
											display: '-webkit-box',
											WebkitUserSelect: 'none',
											...noDragTextArea,
										}}
									>
										{response.functionName}
									</Typography>
									<Separator />
									<Stack justifyContent='right' direction='row' width='100%'>
										<Button variant='text' onClick={() => onClick?.(response)}>
											Show
										</Button>
									</Stack>
								</Stack>
							</Panel>
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
