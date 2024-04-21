import * as React from 'react';
import Layout from './Layout/index';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import { RecoilRoot } from 'recoil';
import { IconButton, Icon } from '@midasit-dev/moaui';
import './output.css';

declare global {
	interface Window {
		playground: {
			canvas: any;
			layers: any;
		};
	}
}

export default function Playground() {
	React.useEffect(() => {
		window.playground = {
			canvas: {},
			layers: [],
		};
	})

	return (
		<RecoilRoot>
			<SnackbarProvider
				maxSnack={3}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				action={(key: any) => (
					<IconButton transparent transparentColor='white' onClick={() => closeSnackbar(key)}>
						<Icon iconName='Close' />
					</IconButton>
				)}
			>
				<Layout />
			</SnackbarProvider>
		</RecoilRoot>
	);
}
