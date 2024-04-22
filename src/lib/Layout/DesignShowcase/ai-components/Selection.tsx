import React from 'react';
import { useQuery } from 'react-query';
import SelectionList from './SelectionList';
import { QueryKeys } from './defs/QueryKeys';
import { IListItem, IQueryKey, ISuggest } from './defs/Interface';
import { AnimatePresence } from 'framer-motion';
import FallbackCard from './FallbackCard';
import { Stack } from '@mui/material';
import { functionDetailAdapter, functionListAdapter } from './defs/adapter';
import { useSetRecoilState } from 'recoil';
import { fetchingStateAtom } from './defs/atom';
import { ContentLoadingSkeleton } from './Skeletons';

export interface ISelectionProps {
	query?: IQueryKey;
	onClick?: (item: ISuggest) => void;
	onDelete?: (item: IListItem) => void;
}

const functionDetailGetter = async (item: IListItem) : Promise<ISuggest> => {
	return await new Promise(async (resolve, reject) => {
		try {
			resolve(await functionDetailAdapter(item));
		} catch(error) {
			reject(error);
		}
	});
};

export const Selection = (props: ISelectionProps) => {
	const { onClick = () => {}, onDelete = () => {}, query } = props;
	const setLoading = useSetRecoilState(fetchingStateAtom);
	const [loadingTarget, setLoadingTarget] = React.useState<string | number | undefined | null>(null);
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

	const handleOnClick = (item: IListItem) => {
		setLoadingTarget(item.functionId);
		functionDetailGetter(item).then((value: ISuggest) => {
			console.log(value);
			setLoadingTarget(null);
			onClick?.(value);
		}).catch((error) => {
			console.error(error);
			setLoadingTarget(null);
		});
	};

	return (
		<Stack direction='row' spacing={2}>
			<AnimatePresence>
				{isSuccess && (
					<div key='selection-success-container'>
						<SelectionList
							key='selection-success'
							list={data}
							onClick={handleOnClick}
							onDelete={onDelete}
							loading={loadingTarget !== null}
							loadingTarget={loadingTarget}
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
						<ContentLoadingSkeleton key='selection-loading' items={3} />
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
