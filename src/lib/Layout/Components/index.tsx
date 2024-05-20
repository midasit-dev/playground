import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PanelLeft from './PanelLeft';
import PanelRight from './PanelRight';
import Canvas from './Canvas';
import Dockbar from './Docbkar';
import { useSetRecoilState } from 'recoil';
import { SelectedLayerIdState } from '../recoilState';

const App = () => {
	const setSelectedLayerId = useSetRecoilState(SelectedLayerIdState);

	useEffect(() => {
		//나갈 때 selected Layer Id 초기화
		return () => setSelectedLayerId(null);
	}, [setSelectedLayerId]);

	function onKeyDown(event: any) {
		//Undo shortcut "Ctrl + Z",
		//Redo shortcut "Ctrl + Y", "Ctrl + Shift + Z"
		if (event.ctrlKey && event.key === 'z') {
			console.log('ctrl + z');
		} else if (
			(event.ctrlKey && event.shiftKey && event.key === 'Z') ||
			(event.ctrlKey && event.key === 'y')
		) {
			console.log('ctrl + shift + z');
		}
	}

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className='bg-gray-100 w-full h-[calc(100vh-56px)]'
				tabIndex={0}
				onKeyDown={onKeyDown}
			>
				<Canvas />
				<Dockbar />
				<PanelLeft />
				<PanelRight />
			</motion.div>
		</AnimatePresence>
	);
};

export default App;
