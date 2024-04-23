import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button, Panel, Separator } from '@midasit-dev/moaui';
import { Typography, Stack, IconButton, CircularProgress } from '@mui/material';
import { IListItem } from './defs/Interface';
import DeleteIcon from '@mui/icons-material/Delete';

export interface ISelectionListProps {
	list: Array<IListItem>;
	onClick?: (item: IListItem) => void;
	onDelete?: (item: IListItem) => void;
	loading?: boolean;
	loadingTarget?: string | number | undefined | null;
}

const noDragTextArea = {
	cursor: 'default',
	userSelect: 'none',
};

const scoreColors: string[] = ['linear-gradient(to right, #642B73, #c6426e)', '#000'];

export const SelectionList = React.forwardRef((props: ISelectionListProps, ref: any) => {
	const { list, onClick, onDelete, loading, loadingTarget } = props;
	const [topMenuAnchor, setTopMenuAnchor] = React.useState<string | number | null>(null);

	return (
		<Stack direction='row' spacing={2} ref={ref}>
			{list &&
				list.length > 0 &&
				list.map((item: IListItem, index: number) => {
					return (
						<motion.div
							layout
							key={`AI-response-${item.functionId}`}
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
							<div
								style={{
									position: 'relative',
									width: '16rem',
									height: '12rem',
								}}
							>
								<Stack
									width='100%'
									className='wrapper-box shadow-xl shadow-black/10 border border-pg-gray-medium rounded-md bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg'
									height='100%'
									padding={0}
									key={item.functionId}
									sx={{
										position: 'absolute',
										overflow: 'hidden',
									}}
								>
									<Stack
										position='absolute'
										width='16rem'
										height='1.5rem'
										justifyContent='center'
										alignItems='center'
										sx={{
											borderTopRightRadius: '4px',
											borderTopLeftRadius: '4px',
											overflow: 'hidden',
										}}
										onMouseEnter={() => setTopMenuAnchor(item.functionId)}
										onMouseLeave={() => setTopMenuAnchor(null)}
									>
										<AnimatePresence mode='popLayout'>
											{topMenuAnchor === item.functionId && (
												<motion.div
													style={{
														height: '100%',
														width: '100%',
														justifyContent: 'flex-end',
														display: 'flex',
														background:
															'linear-gradient(225deg, #f2709c 5%, #ff9472 15%, transparent 0%)',
													}}
													initial={{ opacity: 0, x: 50 }}
													animate={{ opacity: 1, x: 0 }}
													exit={{ opacity: 0, x: 50 }}
													transition={{
														type: 'spring',
														stiffness: 100,
														damping: 20,
													}}
												>
													<IconButton onClick={() => onDelete?.(item)}>
														<DeleteIcon fontSize='small' />
													</IconButton>
												</motion.div>
											)}
										</AnimatePresence>
									</Stack>
									<Stack
										justifyContent='space-between'
										direction='column'
										height='100%'
										padding={2}
									>
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
													{`${String(Math.floor(item.similarityScore * 100))}%`}
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
												WebkitBoxOrient: 'vertical',
												display: '-webkit-box',
												WebkitUserSelect: 'none',
												...noDragTextArea,
											}}
										>
											{item.functionName}
										</Typography>
										<Separator />
										<Stack
											justifyContent='space-between'
											direction='row'
											alignItems='center'
											width='100%'
										>
											<div />
											<Button variant='text' onClick={() => onClick?.(item)}>
												Show
											</Button>
										</Stack>
									</Stack>
								</Stack>
								{loading && (
									<Stack
										position='absolute'
										justifyContent='center'
										alignItems='center'
										width='100%'
										height='100%'
										sx={{
											backgroundColor: 'rgba(255, 255, 255, 0.5)',
										}}
									>
										{loadingTarget === item.functionId && loading && <CircularProgress />}
									</Stack>
								)}
							</div>
						</motion.div>
					);
				})}
		</Stack>
	);
});

SelectionList.defaultProps = {
	list: [],
	onClick: () => {},
};

export default SelectionList;
