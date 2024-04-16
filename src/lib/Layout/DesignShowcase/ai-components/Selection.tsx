import React from 'react';
import { useQuery } from 'react-query';
import SelectionList from './SelectionList';
import { QueryKeys } from './defs/QueryKeys';
import { IListItem } from './defs/Interface';

import { v4 as uuidv4 } from 'uuid';

interface ISelectionProps {
	enabled?: boolean;
	onClick?: (item: IListItem) => void;
}

export const Selection = (props: ISelectionProps) => {
	const { onClick = () => {} } = props;
	const { data } = useQuery(
		QueryKeys.SELECTION_KEY,
		() => {
			return new Promise((resolve) => {
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
			useErrorBoundary: true,
			suspense: true,
		},
	);

	return <SelectionList list={data as Array<any>} onClick={onClick} />;
};

export default Selection;
