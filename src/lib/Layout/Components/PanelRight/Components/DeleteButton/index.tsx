import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LayersState, SelectedLayerIdState } from '../../../../recoilState';
import { Layer } from '../../../../../Common/types';

const SvgDelete = () => (
	<div className='w-5 h-5'>
		<svg
			width='100%'
			height='100%'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M18 6L6 18M6 6L18 18'
				stroke='rgb(55 65 81)'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	</div>
);

const App = (props: any) => {
	const { index } = props;
	const [isClicked, setIsClicked] = useState(false);

	//현재 선택하고 있는 Layer의 ID
	const selectedLayerId = useRecoilValue(SelectedLayerIdState);

	//전역 데이터의 갱신을 위한 Recoil
	const setLayers = useSetRecoilState(LayersState);

	// 현 Component 삭제 함수
	const deleteCurrentComponent = useCallback(() => {
		setLayers((prev: Layer[]) => {
			return prev.map((prevLayer: Layer) => {
				if (prevLayer.id === selectedLayerId) {
					return {
						...prevLayer,
						children: prevLayer.children?.filter((_, i) => i !== index),
					};
				}
				return prevLayer;
			});
		});
	}, [index, selectedLayerId, setLayers]);

	return (
		<motion.button
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.8 }}
			onClick={() => {
				setIsClicked(!isClicked);
				deleteCurrentComponent();
			}}
			className='w-auto h-auto py-2'
		>
			<SvgDelete />
		</motion.button>
	);
};

export default App;
