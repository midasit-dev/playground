import React from 'react';
import Playground, { type Schema } from './lib';
import SideBar from './sidebar';

const App = () => {
	return (
		<>
			<SideBar />
			<Playground
				schema={
					{
						// canvas: sampleCanvas,
						// layers: sampleLayers,
					}
				}
				onChange={(schema: Schema) => {
					console.log(JSON.stringify(schema.canvas));
					console.log(JSON.stringify(schema.layers));
				}}
			/>
		</>
	);
};

export default App;

// const sampleCanvas = {"width":640,"height":640}
// const sampleLayers = [{"id":"1-FloatingBox-916bb50c","type":"FloatingBox","props":{"x":0,"y":0,"width":160,"height":152,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"2-FloatingBox-9fe6b261","type":"FloatingBox","props":{"x":160,"y":0,"width":160,"height":48,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"3-FloatingBox-e3c9777e","type":"FloatingBox","props":{"x":160,"y":48,"width":160,"height":104,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"4-FloatingBox-17cd7b9e","type":"FloatingBox","props":{"x":320,"y":0,"width":160,"height":152,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"5-FloatingBox-52c84af2","type":"FloatingBox","props":{"x":480,"y":0,"width":160,"height":48,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"6-FloatingBox-626cfb45","type":"FloatingBox","props":{"x":480,"y":48,"width":160,"height":48,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"7-FloatingBox-34e2ab69","type":"FloatingBox","props":{"x":480,"y":96,"width":160,"height":56,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"8-FloatingBox-69d06c80","type":"FloatingBox","props":{"x":0,"y":152,"width":160,"height":48,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"9-FloatingBox-684be638","type":"FloatingBox","props":{"x":160,"y":152,"width":480,"height":48,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"10-FloatingBox-bcf9db08","type":"FloatingBox","props":{"x":72,"y":200,"width":160,"height":48,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"11-FloatingBox-8a633e8d","type":"FloatingBox","props":{"x":0,"y":200,"width":72,"height":48,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"12-FloatingBox-e413ff68","type":"FloatingBox","props":{"x":232,"y":200,"width":408,"height":48,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"13-FloatingBox-c8501068","type":"FloatingBox","props":{"x":0,"y":248,"width":312,"height":392,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"14-FloatingBox-fd5dbf0b","type":"FloatingBox","props":{"x":16,"y":264,"width":280,"height":360,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":"13-FloatingBox-c8501068"},{"id":"15-FloatingBox-c8d73f19","type":"FloatingBox","props":{"x":312,"y":248,"width":160,"height":48,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"16-FloatingBox-bdc8d254","type":"FloatingBox","props":{"x":312,"y":296,"width":160,"height":344,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"17-FloatingBox-2d01f7d1","type":"FloatingBox","props":{"x":472,"y":248,"width":168,"height":48,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"18-FloatingBox-477ea937","type":"FloatingBox","props":{"x":472,"y":296,"width":168,"height":344,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":null},{"id":"19-FloatingBox-3510bdb9","type":"FloatingBox","props":{"x":328,"y":312,"width":128,"height":48,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":"16-FloatingBox-bdc8d254"},{"id":"20-FloatingBox-4030f030","type":"FloatingBox","props":{"x":328,"y":376,"width":128,"height":248,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":"16-FloatingBox-bdc8d254"},{"id":"21-FloatingBox-2e1a08fc","type":"FloatingBox","props":{"x":488,"y":312,"width":136,"height":312,"guideBoxProps":{"width":"inherit","height":"inherit"}},"children":[],"parent":"18-FloatingBox-477ea937"}]
