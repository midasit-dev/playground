import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import '../VirtualLayer.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultControllerState, ControllerState, CanvasState } from '../recoilState';
import { round } from 'lodash';

export const useController = () => {
	const [controllerState, setControllerState] = useRecoilState(ControllerState);
	const canvasState = useRecoilValue(CanvasState);

	const initialize = React.useCallback(
		(inputs = defaultControllerState) => {
			setControllerState(inputs);
		},
		[setControllerState],
	);

	const [showVirtualLayer, setShowVirtualLayer] = useState(true);

	const handleChangeX = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			let xValue = Number(e.target.value);
			if (xValue + controllerState.width > canvasState.width) {
				xValue = canvasState.width - controllerState.width;
			}
			setControllerState((prev) => ({ ...prev, x: xValue }));
		},
		[canvasState.width, controllerState.width, setControllerState],
	);

	const handleChangeY = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			let yValue = Number(e.target.value);
			if (yValue + controllerState.height > canvasState.height) {
				yValue = canvasState.height - controllerState.height;
			}
			setControllerState((prev) => ({ ...prev, y: yValue }));
		},
		[canvasState.height, controllerState.height, setControllerState],
	);

	const handleChangeWidth = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			let widthValue = Number(e.target.value);
			if (controllerState.x + widthValue > canvasState.width) {
				let xValue = canvasState.width - widthValue;
				if (xValue < 0) xValue = 0;
				setControllerState((prev) => ({ ...prev, x: xValue }));
			}
			setControllerState((prev) => ({ ...prev, width: widthValue }));
		},
		[canvasState.width, controllerState.x, setControllerState],
	);

	const handleChangeHeight = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			let heightValue = Number(e.target.value);
			if (controllerState.y + heightValue > canvasState.height) {
				let yValue = canvasState.height - heightValue;
				if (yValue < 0) yValue = 0;
				setControllerState((prev) => ({ ...prev, y: yValue }));
			}
			setControllerState((prev) => ({ ...prev, height: Number(e.target.value) }));
		},
		[canvasState.height, controllerState.y, setControllerState],
	);

	const handleChangeSpacing = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setControllerState((prev) => ({ ...prev, spacing: Number(e.target.value) }));
		},
		[setControllerState],
	);

	const getCurrentControllerInputs = React.useCallback(() => {
		return controllerState;
	}, [controllerState]);

	const VirtualLayer = React.useCallback(() => {
		if (!showVirtualLayer) return null;
		return (
			<Rnd
				className='virtual-layer'
				default={{
					x: controllerState.x,
					y: controllerState.y,
					width: controllerState.width,
					height: controllerState.height,
				}}
				bounds='parent'
				enableResizing={true}
				disableDragging={false}
				onDragStop={(e, d) => {
					setControllerState((prev) => ({ ...prev, x: d.x, y: round(d.y) }));
				}}
				onResizeStop={(e, direction, ref, delta, position) => {
					setControllerState((prev) => ({
						...prev,
						width: ref.offsetWidth,
						height: ref.offsetHeight,
						x: position.x,
						y: round(position.y),
					}));
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						height: controllerState.height,
					}}
				>
					<div
						className='virtual-layer-content'
						style={{
							fontSize: controllerState.height < 90 ? '12px' : '15px',
							marginBottom: controllerState.height < 90 ? '8px' : '15px',
						}}
					>
						Create layer
					</div>
					<div
						className='virtual-layer-content'
						style={{
							color: 'gray',
							fontSize: controllerState.height < 90 ? '12px' : '15px',
						}}
					>
						'Ctrl + Enter'
					</div>
				</div>
			</Rnd>
		);
	}, [controllerState.height, controllerState.width, controllerState.x, controllerState.y, setControllerState, showVirtualLayer]);

	return {
		initialize,
		controllerState,
		handleChangeX,
		handleChangeY,
		handleChangeWidth,
		handleChangeHeight,
		handleChangeSpacing,
		getCurrentControllerInputs,
		showVirtualLayer,
		setShowVirtualLayer,
		VirtualLayer,
	};
};
