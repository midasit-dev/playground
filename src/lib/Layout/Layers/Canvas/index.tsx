import React from 'react';
import GuideLayer from './GuideLayer';
import _ from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	CanvasState,
	GuideLayerVisibleState,
	LayerRenderingBoxesState,
	LayersCanvasMarginState,
} from '../../recoilState';
import { ControllerInputs } from '../../../Common/types';
import { zindex_layers_canvas } from '../../../Common/zindex';
import { canvas_snap_criteria, nearestMultipleOfCanvasSnapCriteria } from '../../../Common/const';

const guideLayerSize = {
	width: 160,
	height: 48,
};

const LayersCanvas = (props: any) => {
	const { addLayerHandler } = props;

	const boxes = useRecoilValue(LayerRenderingBoxesState);
	const canvasState = useRecoilValue(CanvasState);
	const canvasMargin = useRecoilValue(LayersCanvasMarginState);

	const [isVisible] = useRecoilState(GuideLayerVisibleState);
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
		<div
			className='w-full h-[calc(100vh-32px)] flex justify-center items-center'
			style={{ position: 'relative', zIndex: zindex_layers_canvas }}
		>
			{/** Canvas 객체 */}
			<div
				className='wrapper-box shadow-xl shadow-black/5 rounded-md border border-pg-gray-medium max-w-full max-h-[calc(100vh-32px)] box-border flex flex-wrap content-start bg-white relative focus:outline-none'
				style={{
					width: canvasState.width,
					height: canvasState.height,
					marginTop: canvasMargin.marginTop,
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
					//가이드 레이어의 위치가 임의의 값이고, 캔버스는 Snap을 (8)로 가지고 있으므로 실제 x, y값을 변경한다.
					const adjustX = nearestMultipleOfCanvasSnapCriteria(guideLayerPosition.x);
					const adjustY = nearestMultipleOfCanvasSnapCriteria(guideLayerPosition.y);
					const currentGuideLayerInput: ControllerInputs = {
						x: adjustX,
						y: adjustY,
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
