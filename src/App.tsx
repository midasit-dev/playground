import React from 'react';
import Playground, { getCanvasValue } from './lib';
import SideBar from './list';

const App = () => {
	const value = getCanvasValue();
	console.log('app.tsx', value);

	return (
		<>
			<SideBar />
			<Playground />
		</>
	);
};

export default App;
