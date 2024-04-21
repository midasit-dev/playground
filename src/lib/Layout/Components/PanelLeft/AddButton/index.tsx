import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
	LayersState,
	PropComponentLayerAddValueState,
	SelectedLayerIdState,
} from '../../../recoilState';
import { Layer, Layers } from '../../../../Common/types';

const SvgAdd = () => (
	<div className='w-5 h-5'>
		<svg
			width='100%'
			height='100%'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M12 8V16M8 12H16M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z'
				stroke='#fff'
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	</div>
);

const App = () => {
	const [isClicked, setIsClicked] = useState(false);

	//현재 선택하고 있는 Layer의 ID
	const selectedLayerId = useRecoilValue(SelectedLayerIdState);

	//UI Schema용 전체 데이터 갱신을 위한 Reocil
	const setLayers = useSetRecoilState(LayersState);

	//PropComponents에서 임시로 저장한 값을 가져온다.
	const propCompLayerAddValue = useRecoilValue(PropComponentLayerAddValueState);

	const onClickHandlerAdd = useCallback(() => {
		setLayers((prev: Layers) => {
			return prev.map((layer: Layer) => {
				if (layer.id === selectedLayerId) {
					const updatedChildren = layer.children
						? [...layer.children, propCompLayerAddValue]
						: [propCompLayerAddValue];
					return {
						...layer,
						children: updatedChildren,
					};
				}
				return layer;
			});
		});
	}, [propCompLayerAddValue, selectedLayerId, setLayers]);

	return (
		<motion.div
			className='absolute w-full h-auto bottom-[24px]'
			animate={isClicked ? 'click' : 'none'}
		>
			<motion.button
				whileTap={{ scale: 0.97 }}
				onClick={() => {
					setIsClicked(!isClicked);
					onClickHandlerAdd();
				}}
				className='w-[302px] h-auto py-3 px-4 rounded-md shadow-lg box-border space-x-10 flex flex-row items-center bg-pg-blue-dark text-white text-sm justify-between'
			>
				추가하기
				<motion.div
					variants={{
						click: { rotate: 180 },
						none: { rotate: 0 },
					}}
					transition={{ duration: 0.2 }}
					style={{ originY: 0.5 }}
				>
					<SvgAdd />
				</motion.div>
			</motion.button>
		</motion.div>
	);
};

export default App;
