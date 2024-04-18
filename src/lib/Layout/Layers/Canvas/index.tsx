import React from 'react';
import GuideLayer from './GuideLayer';
import _ from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CanvasState, GuideLayerVisibleState, LayerRenderingBoxesState } from '../../recoilState';
import { ControllerInputs } from 'src/lib/Common/types';

const guideLayerSize = {
	width: 160,
	height: 48,
};

const LayersCanvas = (props: any) => {
	const { addLayerHandler } = props;

	const boxes = useRecoilValue(LayerRenderingBoxesState);
	const canvasState = useRecoilValue(CanvasState);

	const [isVisible, setisVisible] = useRecoilState(GuideLayerVisibleState);
	const [guideLayerPosition, setGuideLayerPosition] = React.useState({ x: 0, y: 0 });
	const deboundedUpdatePosition = _.debounce((newTop: number, newLeft: number) => {
		if (isVisible) {
			setGuideLayerPosition((pre: any) => {
				return {
					...pre,
					x: newLeft,
					y: newTop,
				};
			});
		}
	}, 0);

	return (
		<div className='w-full h-[calc(100vh-32px)] flex justify-center items-center'>
			{/** Canvas 객체 */}
			<div
				className='wrapper-box shadow-xl shadow-black/5 rounded-md border border-pg-gray-medium max-w-full max-h-[calc(100vh-32px)] box-border flex flex-wrap content-start bg-white relative focus:outline-none'
				style={{
					width: canvasState.width,
					height: canvasState.height,
				}}
				tabIndex={0}
				// onMouseEnter={() => setisVisible(true)}
				// onMouseLeave={() => setisVisible(false)}
				onMouseMove={(event: any) => {
					const { x, y } = event.currentTarget.getBoundingClientRect();
					const newTop = event.clientY - y;
					const newLeft = event.clientX - x;
					deboundedUpdatePosition(newTop, newLeft);
				}}
				onClick={(event: any) => {
					if (!isVisible) return;
					const currentGuideLayerInput: ControllerInputs = {
						x: guideLayerPosition.x,
						y: guideLayerPosition.y,
						width: guideLayerSize.width,
						height: guideLayerSize.height,
						spacing: 0,
					};
					addLayerHandler('default', currentGuideLayerInput);
				}}
			>
				<GuideLayer isVisible={isVisible} position={guideLayerPosition} size={guideLayerSize} />
				{boxes.map((box) => box.element)}
			</div>
		</div>
	);
};

export default LayersCanvas;
