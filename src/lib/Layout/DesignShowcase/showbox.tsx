import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CanvasState, ShowCaseBoxState } from '../recoilState';

import { motion, AnimatePresence } from 'framer-motion';
import { Rnd } from 'react-rnd';

export default function ShowBox() {
	const canvasState = useRecoilValue(CanvasState);
	const [showCaseBoxState, setShowCaseBoxState] = useRecoilState(ShowCaseBoxState);

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
				disableDragging={false}
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
					Design Showcase
				</div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='wrapper-box'
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
						backgroundColor: 'rgba(255, 255, 255, 0.9)',
						boxShadow:
							'var(--elevation-200-canvas, 0px 0px .5px rgba(0, 0, 0, .18), 0px 3px 8px rgba(0, 0, 0, .1), 0px 1px 3px rgba(0, 0, 0, .1))',
						borderRadius: '0.25rem',
						marginBottom: '3rem',
						border: '1px solid #d1d1d1',
					}}
				>
					<p>Design Showcase is a component that shows the design of the component.</p>
				</motion.div>
			</Rnd>
		</AnimatePresence>
	);
}
