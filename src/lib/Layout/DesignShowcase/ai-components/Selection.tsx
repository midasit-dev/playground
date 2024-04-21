import React from 'react';
import { useQuery } from 'react-query';
import SelectionList from './SelectionList';
import { QueryKeys } from './defs/QueryKeys';
import { IListItem, IQueryKey } from './defs/Interface';
import { AnimatePresence } from 'framer-motion';
import FallbackCard from './FallbackCard';
import { Stack } from '@mui/material';
import { functionListAdapter } from './defs/adapter';
import { useSetRecoilState } from 'recoil';
import { fetchingStateAtom } from './defs/atom';
import { ContentLoadingSkeleton } from './Skeletons';

export interface ISelectionProps {
	query?: IQueryKey;
	onClick?: (item: IListItem) => void;
	onDelete?: (item: IListItem) => void;
}

export const Selection = (props: ISelectionProps) => {
	const { onClick = () => {}, onDelete = () => {}, query } = props;
	const setLoading = useSetRecoilState(fetchingStateAtom);
	const { data, isError, isLoading, isSuccess, refetch, error } = useQuery(
		[QueryKeys.SELECTION_KEY, query],
		async () => {
			setLoading?.(true);
			return await functionListAdapter(query).finally(() => setLoading?.(false));
		},
		{
			enabled: true,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			cacheTime: 0,
			select: (data) => data?.functionList || [],
		},
	);

	return (
		<Stack direction='row' spacing={2}>
			<AnimatePresence>
				{isSuccess && (
					<div key='selection-success-container'>
						<SelectionList
							key='selection-success'
							list={
								data || [
									{ functionId: '1', functionName: 'test', similarityScore: 0.5 },
									{ functionId: '2', functionName: 'test', similarityScore: 0.5 },
									{ functionId: '3', functionName: 'test', similarityScore: 0.5 },
								]
							}
							onClick={onClick}
							onDelete={onDelete}
						/>
					</div>
				)}
				{isLoading && (
					<div
						key='selection-loading-container'
						style={{
							display: 'flex',
							justifyContent: 'center',
							width: '100%',
							alignItems: 'center',
							position: 'fixed',
							left: 0,
							bottom: 0,
							transform: 'translateY(-50%)',
						}}
					>
						<ContentLoadingSkeleton key='selection-loading' items={5} />
					</div>
				)}
				{isError && (
					<FallbackCard key='selection-error' error={error} resetErrorBoundary={refetch} />
				)}
			</AnimatePresence>
		</Stack>
	);
};

export default Selection;
