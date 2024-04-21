import { AnimatePresence, motion } from 'framer-motion';
import ModifyButton from './ModifyButton';
import DeleteButton from './DeleteButton';
import { SelectedLayerIdState, SelectedLayerState } from '../../../recoilState';
import { useRecoilValue } from 'recoil';
import { Layer } from '../../../../Common/types';
import { useEffect, useState } from 'react';

const App = () => {
	//현재 선택된 Layer의 Id를 가져온다.
	const selectedLayerId = useRecoilValue(SelectedLayerIdState);

	//현재 선택된 Layer의 State를 가져온다.
	const selectedLayer = useRecoilValue(SelectedLayerState);

	const [selLayerChildrens, setLayerChildrens] = useState<any>([]);
	useEffect(() => {
		if (selectedLayer && selectedLayer.children) {
			setLayerChildrens(selectedLayer.children);
		}
		if (selectedLayerId === null) {
			setLayerChildrens([]);
		}
	}, [selectedLayer, selectedLayerId]);

	return (
		<AnimatePresence>
			<motion.div>
				<div className='flex flex-col space-y-1'>
					{selLayerChildrens.map((layer: Layer, index: number) => (
						<motion.div
							key={index}
							className='w-full h-auto flex flex-row justify-between items-center'
							initial={{ x: -25, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
						>
							<ModifyButton index={index} layer={layer} />
							<DeleteButton index={index} layer={layer} />
						</motion.div>
					))}
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default App;
