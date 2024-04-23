import React from 'react';
import { useQuery } from 'react-query';
import SelectionList from './SelectionList';
import { QueryKeys } from './defs/QueryKeys';
import { IListItem, IQueryKey, ISuggest } from './defs/Interface';
import { AnimatePresence, motion } from 'framer-motion';
import FallbackCard from './FallbackCard';
import { Stack } from '@mui/material';
import { functionDetailAdapter, functionListAdapter } from './defs/adapter';
import { useSetRecoilState } from 'recoil';
import { fetchingStateAtom, loadingTargetStateAtom } from './defs/atom';
import { ContentLoadingSkeleton } from './Skeletons';
import { useRecoilState } from "recoil";

export interface ISelectionProps {
	query?: IQueryKey;
	onClick?: (item: ISuggest) => void;
	onDelete?: (item: IListItem) => void;
}

const functionDetailGetter = async (item: IListItem): Promise<ISuggest> => {
	return await new Promise(async (resolve, reject) => {
		try {
			resolve(await functionDetailAdapter(item));
		} catch (error) {
			reject(error);
		}
	});
};

export const Selection = (props: ISelectionProps) => {
	const { onClick = () => {}, onDelete = () => {}, query } = props;
	const setLoading = useSetRecoilState(fetchingStateAtom);
	const [loadingTarget, setLoadingTarget] = useRecoilState<any>(loadingTargetStateAtom);
	const { data, isError, isFetching, isSuccess, refetch, error } = useQuery(
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
			keepPreviousData: false,
		},
	);

	const handleOnClick = (item: IListItem) => {
		setLoadingTarget(item.functionId);
		functionDetailGetter(item)
			.then((value: ISuggest) => {
				onClick?.(value);
			})
			.catch((error) => {
				console.error(error);
				setLoadingTarget(null);
			});
	};

	const [memoizedData, setMemoizedData] = React.useState<IListItem[]>(data || []);

	React.useEffect(() => {
		setMemoizedData((prev: any) => {
			if (isFetching) return [];

			if (prev !== data) {
				return data;
			}
			return prev;
		});
	}, [isFetching, data]);

	return (
		<Stack direction='row' spacing={2} position='relative' height='12rem'>
			<AnimatePresence>
				{isSuccess && (
					<motion.div key='selection-success-container'>
						<SelectionList
							key='selection-success'
							list={memoizedData}
							onClick={handleOnClick}
							onDelete={onDelete}
							loading={loadingTarget !== null}
							loadingTarget={loadingTarget}
						/>
					</motion.div>
				)}
				{isFetching && (
					<motion.div
						key='selection-loading-container'
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: '100%',
							position: 'absolute',
							margin: 0,
						}}
					>
						<ContentLoadingSkeleton key='selection-loading' items={3} />
					</motion.div>
				)}
				{isError && (
					<FallbackCard key='selection-error' error={error} resetErrorBoundary={refetch} />
				)}
			</AnimatePresence>
		</Stack>
	);
};

export default Selection;
