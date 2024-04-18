import React from 'react';

const App = (props: any) => {
	const { isVisible, position, size } = props;

	return isVisible ? (
		<div
			className='absolute bg-pg-blue-medium bg-opacity-30'
			style={{
				top: position.y,
				left: position.x,
				width: size.width,
				height: size.height,
			}}
		/>
	) : null;
};

export default App;
