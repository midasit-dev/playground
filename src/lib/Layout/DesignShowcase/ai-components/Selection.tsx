import React from 'react';
import { useQuery } from 'react-query';
import SelectionList from './SelectionList';
import { QueryKeys } from './defs/QueryKeys';
import { IListItem } from './defs/Interface';
import { AnimatePresence } from 'framer-motion';

import { v4 as uuidv4 } from 'uuid';
import { ContentLoadingSkeleton } from './Skeletons';
import FallbackCard from './FallbackCard';
import { Stack } from '@mui/material';

interface ISelectionProps {
	enabled?: boolean;
	onClick?: (item: IListItem) => void;
	onDelete?: (item: IListItem) => void;
}

export const Selection = (props: ISelectionProps) => {
	const { onClick = () => {}, onDelete = () => {} } = props;
	const { data, isError, isFetching, isSuccess, refetch, error } = useQuery(
		QueryKeys.SELECTION_KEY,
		() => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([
						{ functionId: uuidv4(), functionName: uuidv4(), score: 0.87 },
						{ functionId: uuidv4(), functionName: uuidv4(), score: 0.85 },
						{ functionId: uuidv4(), functionName: uuidv4(), score: 0.8 },
					]);
				}, 3000);
			});
		},
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchInterval: false,
		},
	);

	return (
		<Stack direction='row' spacing={2}>
			<AnimatePresence mode='wait'>
				{isSuccess && (
					<SelectionList
						key='selection-success'
						list={data as Array<any>}
						onClick={onClick}
						onDelete={onDelete}
					/>
				)}
				{isFetching && <ContentLoadingSkeleton key='selection-fetching' />}
				{isError && (
					<FallbackCard key='selection-error' error={error} resetErrorBoundary={refetch} />
				)}
			</AnimatePresence>
		</Stack>
	);
};

export default Selection;
