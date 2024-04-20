import React from 'react';
import { useRecoilValue } from 'recoil';
import { CanvasMarginState, CanvasState, LayersState } from '../../recoilState';
import { type Layer } from '../../../Common/types';
import ToComponent from '../MakeCompFunctions/ToComponent';
import { zindex_canvas } from '../../../Common/zindex';

const App = () => {
	const canvas = useRecoilValue(CanvasState);
	const canvasMargin = useRecoilValue(CanvasMarginState);
	const layers = useRecoilValue(LayersState);

	return (
		<div
			className='w-full h-[calc(100vh-56px)] flex justify-center items-center'
			style={{ position: 'relative', zIndex: zindex_canvas }}
		>
			<div
				className='shadow-xl shadow-black/5 rounded-md border border-pg-gray-medium max-w-full max-h-[calc(100vh-32px)] box-border flex flex-wrap content-start bg-white relative'
				style={{
					width: canvas.width,
					height: canvas.height,
					marginTop: canvasMargin.marginTop,
				}}
			>
				{layers.map((layer: Layer, index: number) => {
					return <ToComponent key={index} layer={layer} />;
				})}
			</div>
		</div>
	);
};

export default App;
