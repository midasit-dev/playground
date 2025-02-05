import React from 'react';
import { useBoxes } from './useBoxes';
import { useController } from './useController';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LayerRenderingBoxesState, LayersState } from '../recoilState';
import { motion, AnimatePresence } from 'framer-motion'; // framer-motion 라이브러리를 임포트합니다.
import DockbarBottm from './Dockbar';
import Canvas from './Canvas';

const App = () => {
	const setBoxes = useSetRecoilState(LayerRenderingBoxesState);
	const layers = useRecoilValue(LayersState);
	const { initialize: initializeInputs } = useController();
	const { createNewBox, handleClickAddBox, handleClickPrevDelete, handleClickDelAllBoxes } =
		useBoxes({ initializeInputs });

	React.useEffect(() => {
		//Boxes가 비어있는 경우, 다시 그려준다.
		const newBoxes = [];
		for (const schema of layers) {
			newBoxes.push(
				createNewBox(schema.id, {
					x: schema.props.x,
					y: schema.props.y,
					width: schema.props.width,
					height: schema.props.height,
					spacing: 0,
				}),
			);
		}
		setBoxes(newBoxes);
	}, [createNewBox, layers, setBoxes]);

	return (
		<AnimatePresence>
			<motion.div
				key={'layer-index'}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='bg-gray-100 w-full h-[calc(100vh-56px)]'
			>
				<Canvas addLayerHandler={handleClickAddBox} />
				<DockbarBottm
					preDeleteLayerHandler={handleClickPrevDelete}
					allDeleteLayersHandler={handleClickDelAllBoxes}
				/>
			</motion.div>
		</AnimatePresence>
	);
};

export default App;
