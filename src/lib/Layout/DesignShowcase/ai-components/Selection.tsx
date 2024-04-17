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
		() => functionListAdapter(query),
		{
			enabled: true,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchInterval: false,
			cacheTime: 0,
			select: (data) => data?.functionList || [],
			onSettled: () => {
				setLoading?.(false);
			},
		},
	);

	React.useEffect(() => {
		if (isLoading) {
			setLoading?.(true);
		}
	}, [isLoading, setLoading]);

	return (
		<Stack direction='row' spacing={2}>
			<AnimatePresence>
				{isSuccess && (
					<SelectionList
						key='selection-success'
						list={data}
						onClick={onClick}
						onDelete={onDelete}
					/>
				)}
				{isError && (
					<FallbackCard key='selection-error' error={error} resetErrorBoundary={refetch} />
				)}
			</AnimatePresence>
		</Stack>
	);
};

export default Selection;
