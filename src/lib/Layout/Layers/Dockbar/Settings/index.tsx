import React from 'react';
import { motion } from 'framer-motion';
import CanvasResizeInput from './CanvasResizeInput';
import CanvasMoveBtn from './CanvasMoveBtn';

const App = (props: any) => {
	const { isOn } = props;

	return (
		<motion.div
			className='w-auto h-auto bg-transparent flex flex-row space-x-4'
			animate={{
				opacity: isOn ? 1 : 0,
				display: isOn ? 'flex' : 'none',
				position: 'absolute',
				top: isOn ? -130 : -100,
				right: 0,
				pointerEvents: isOn ? 'auto' : 'none',
				zIndex: isOn ? 100 : -1,
			}}
		>
			<CanvasResizeInput />
			<CanvasMoveBtn />
		</motion.div>
	);
};

export default App;
