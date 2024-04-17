import React from 'react';

import { Stack } from '@midasit-dev/moaui';
import InputField from './InputField';
import Selection from './Selection';
import { IListItem } from './defs/Interface';
import { useQueryClient } from 'react-query';
import { QueryKeys } from './defs/QueryKeys';
import { uniqueId } from 'lodash';

interface IFooterProps {
	onItemClick?: (item: IListItem) => void;
}

function Footer(props: IFooterProps) {
	const [isLoading, setLoading] = React.useState(false);
	const queryClient = useQueryClient();

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
				<Selection onClick={props?.onItemClick} />
				<InputField
					isLoading={isLoading}
					onSend={(value: string) => {
						setLoading(true);

						if (value !== '') {
							// queryClient.refetchQueries([QueryKeys.SELECTION_KEY]);
							queryClient.setQueryData(
								QueryKeys.SELECTION_KEY,
								(prev: Array<IListItem> | undefined) => {
									if (!prev) return [{ functionId: uniqueId(), functionName: value, score: 0.9 }];
									return [...prev, { functionId: uniqueId(), functionName: value, score: 0.9 }];
								},
							);
						}
						setTimeout(() => {
							setLoading(false);
						}, 3000);
					}}
					onStop={() => {
						setLoading(true);
					}}
				/>
			</Stack>
		</React.Fragment>
	);
}

export default Footer;
