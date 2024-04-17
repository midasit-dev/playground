import React from 'react';

import { Stack } from '@midasit-dev/moaui';
import InputField from './InputField';
import Selection from './Selection';
import { ISelectionData, IListItem, IQueryKey, IFooterProps } from './defs/Interface';
import { useQueryClient } from 'react-query';
import { QueryKeys } from './defs/QueryKeys';
import { fetchingStateAtom } from './defs/atom';
import { useRecoilValue } from 'recoil';

function Footer(props: IFooterProps) {
	const [query, setQuery] = React.useState<IQueryKey>(undefined);
	const queryClient = useQueryClient();
	const isLoading = useRecoilValue(fetchingStateAtom);

	const onDelete = React.useCallback(
		(item: IListItem) => {
			queryClient.setQueryData(
				[QueryKeys.SELECTION_KEY, query],
				(prev: ISelectionData | undefined) => {
					return {
						functionList: prev?.functionList?.filter?.(
							(i: IListItem) => i.functionId !== item.functionId,
						),
					};
				},
			);
		},
		[queryClient, query],
	);

	return (
		<React.Fragment>
			<Stack
				position='fixed'
				bottom={0}
				left={0}
				right={0}
				display='flex'
				alignItems='center'
				width='100%'
				spacing={2}
			>
				<Selection query={query} onClick={props?.onItemClick} onDelete={onDelete} />
				<InputField
					isLoading={isLoading}
					onSend={(value: string) => {
						if (value !== '') {
							setQuery(value);
						}
					}}
				/>
			</Stack>
		</React.Fragment>
	);
}

export default Footer;
