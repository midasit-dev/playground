import React from 'react';
import { useBoxes } from './useBoxes';
import { useController } from './useController';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LayerRenderingBoxesState, LayersState } from '../recoilState';
import { motion, AnimatePresence } from 'framer-motion'; // framer-motion 라이브러리를 임포트합니다.
import DockbarBottm from './Dockbar';
import Canvas from './Canvas';

const App = () => {
	const [, setBoxes] = useRecoilState(LayerRenderingBoxesState);
	const layers = useRecoilValue(LayersState);
	const { initialize: initializeInputs } = useController();
	const { createNewBox, handleClickAddBox, handleClickPrevDelete, handleClickDelAllBoxes } =
		useBoxes({ initializeInputs });

	React.useEffect(() => {
		//layers가 초기에 값이 []인데, 채워져 있으면 실행한다.
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
