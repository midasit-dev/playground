import React from 'react';
import ShowBox from './showbox';
export default function DesignShowcase() {
	return (
		<div
			style={{
				width: '100%',
				height: 'calc(100vh - 32px)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ShowBox />
		</div>
	);
}
