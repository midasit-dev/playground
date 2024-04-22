import * as React from 'react';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import { RecoilRoot } from 'recoil';
import { IconButton, Icon } from '@midasit-dev/moaui';
import Root, { type PlaygroundProps } from './root';
import './output.css';

const Playground = (props: PlaygroundProps) => {
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
				<Root {...props} />
			</SnackbarProvider>
		</RecoilRoot>
	);
};

export default Playground;
