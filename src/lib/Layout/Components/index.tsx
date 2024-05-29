import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PanelLeft from './PanelLeft';
import PanelRight from './PanelRight';
import Canvas from './Canvas';
import Dockbar from './Dockbar';
import { useSetRecoilState, useRecoilState } from 'recoil';
import {
	SelectedLayerIdState,
	LayersState,
	UndoRedoComponentState,
	UndoRedoDockbar,
	SelectedLayerGuideBoxPropsState,
} from '../recoilState';

import ReactFlow from './ReactFlow';

const App = () => {
	const setSelectedLayerId = useSetRecoilState(SelectedLayerIdState);
	const [layers, setLayers] = useRecoilState(LayersState);
	const [undoRedo, setUndoRedo] = useRecoilState(UndoRedoComponentState);
	const [guideBoxProps, setGuideBoxProps] = useRecoilState(SelectedLayerGuideBoxPropsState);
	const [undoRedoDockbar, setUndoRedoDockbar] = useRecoilState(UndoRedoDockbar);

	useEffect(() => {
		//나갈 때 selected Layer Id 초기화
		return () => setSelectedLayerId(null);
	}, [setSelectedLayerId]);

	function onKeyDown(event: any) {
		//Undo shortcut "Ctrl + Z",
		//Redo shortcut "Ctrl + Y", "Ctrl + Shift + Z"
		if (event.ctrlKey && event.key === 'z') {
			UndoLayoutState();
		} else if (
			(event.ctrlKey && event.shiftKey && event.key === 'Z') ||
			(event.ctrlKey && event.key === 'y')
		) {
			RedoLayoutState();
		}
	}

	const UndoLayoutState = React.useCallback(() => {
		// Undo
		if (undoRedo.undo === null || undoRedo.undo.length === 0) return;
		const currentUndo = undoRedo.undo[undoRedo.undo.length - 1];
		const prevLayers = currentUndo.layers;
		const nowInfo = { layers: layers, selectedLayerId: currentUndo.selectedLayerId };
		setUndoRedo((prev: any) => {
			return {
				undo: prev.undo.slice(0, prev.undo.length - 1),
				redo: [...prev.redo, nowInfo],
			};
		});
		setLayers(prevLayers);

		setSelectedLayerId(currentUndo.selectedLayerId);

		if (undoRedoDockbar.undo === null || undoRedoDockbar.undo.length === 0) return;
		const prevDockbar = undoRedoDockbar.undo[undoRedoDockbar.undo.length - 1];
		setUndoRedoDockbar((prev: any) => {
			return {
				undo: prev.undo.slice(0, prev.undo.length - 1),
				redo: [...prev.redo, guideBoxProps],
			};
		});
		setGuideBoxProps(prevDockbar);
	}, [undoRedo.undo, undoRedo.redo, layers]);

	const RedoLayoutState = React.useCallback(() => {
		// Redo
		if (undoRedo.redo === null || undoRedo.redo.length === 0) return;
		const currentRedo = undoRedo.redo[undoRedo.redo.length - 1];
		const prevLayers = currentRedo.layers;
		const nowInfo = { layers: layers, selectedLayerId: currentRedo.selectedLayerId };
		setUndoRedo((prev: any) => {
			return {
				undo: [...prev.undo, nowInfo],
				redo: prev.redo.slice(0, prev.redo.length - 1),
			};
		});
		setLayers(prevLayers);

		setSelectedLayerId(currentRedo.selectedLayerId);

		if (undoRedoDockbar.redo === null || undoRedoDockbar.redo.length === 0) return;
		const prevDockbar = undoRedoDockbar.redo[undoRedoDockbar.redo.length - 1];
		setUndoRedoDockbar((prev: any) => {
			return {
				undo: [...prev.undo, guideBoxProps],
				redo: prev.redo.slice(0, prev.redo.length - 1),
			};
		});
		setGuideBoxProps(prevDockbar);
	}, [undoRedo.undo, undoRedo.redo, layers]);

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className='bg-gray-100 w-full h-[calc(100vh-56px)]'
				tabIndex={0}
				onKeyDown={onKeyDown}
			>
				{/* <Canvas /> */}
				<ReactFlow />
				<Dockbar Undo={UndoLayoutState} Redo={RedoLayoutState} />
				<PanelLeft />
				<PanelRight />
			</motion.div>
		</AnimatePresence>
	);
};

export default App;
