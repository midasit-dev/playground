import React from 'react';
import Playground, { type Schema } from './lib';
import SideBar from './sidebar';

const App = () => {
	return (
		<>
			<SideBar />
			<Playground onChange={(schema: Schema) => console.log(schema)} />
		</>
	);
};

export default App;
