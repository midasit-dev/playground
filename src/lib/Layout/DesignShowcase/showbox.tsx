import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	CanvasState,
	LayersState,
	ShowCaseBoxState,
	ShowcaseCanvasLockState,
	PythonArgumentComponentState,
} from '../recoilState';
import { type Layer } from '../../Common/types';
import ToComponent from '../Componentized/ToComponent';
import { PageString } from '../../Common/string';
import { motion, AnimatePresence } from 'framer-motion';
import { Rnd } from 'react-rnd';
import { Icon } from '@midasit-dev/moaui';
import Converter from './ai-components/defs/Converter';
import pySchema from './ai-components/defs/pySchema.json';

export default function ShowBox() {
	const canvasState = useRecoilValue(CanvasState);
	const [layers, setLayers] = useRecoilState(LayersState);
	const [showCaseBoxState, setShowCaseBoxState] = useRecoilState(ShowCaseBoxState);
	const [lockDraggingCanvas, setLockDraggingCanvas] = useRecoilState(ShowcaseCanvasLockState);

	async function onClickTest() {
		await Converter(pySchema);
		setLayers([]);
	}

	return (
		<AnimatePresence mode='popLayout'>
			<Rnd
				className='showcase-box'
				default={{
					x: showCaseBoxState.x,
					y: showCaseBoxState.y,
					width: canvasState.width,
					height: canvasState.height,
				}}
				enableResizing={false}
				disableDragging={lockDraggingCanvas}
				onDragStop={(e, d) => {
					setShowCaseBoxState((prev: any) => ({
						...prev,
						x: d.x,
						y: d.y,
					}));
				}}
			>
				<div
					style={{
						width: canvasState.width,
						height: '30px',
						display: 'flex',
						justifyContent: 'end',
						alignItems: 'center',
					}}
				>
					<Icon
						iconName={lockDraggingCanvas ? 'Lock' : 'LockOpenOutlined'}
						opacity={1}
						toButton={true}
						onClick={() => {
							setLockDraggingCanvas(!lockDraggingCanvas);
						}}
					/>
					<Icon iconName='Close' opacity={1} toButton={true} onClick={onClickTest} />
				</div>
				<div
					className='wrapper-box shadow-xl shadow-black/10 border border-pg-gray-medium rounded-md bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg'
					style={{
						zIndex: 1,
						width: canvasState.width,
						height: canvasState.height,
						maxWidth: '100%',
						maxHeight: 'calc(100vh - 32px)',
						boxSizing: 'border-box',
						display: 'flex',
						flexWrap: 'wrap',
						alignContent: 'flex-start',
						marginBottom: '3rem',
					}}
				>
					<div
						onClick={(event) => {
							event.stopPropagation();
						}}
					>
						<AnimatePresence>
							{layers.map((layer: Layer, index: number) => {
								return (
									<motion.div
										key={layer.id}
										initial={{ x: 1000, y:300, opacity: 0}}
										animate={{ x: 0, y: 0, opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 1, type: 'spring', stiffness: 120, damping: 20}}
									>
										<ToComponent layer={layer} parentPage={PageString.Showcase} />
									</motion.div>
								);
							})}
						</AnimatePresence>
					</div>
				</div>
			</Rnd>
		</AnimatePresence>
	);
}
