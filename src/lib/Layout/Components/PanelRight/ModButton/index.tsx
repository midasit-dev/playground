import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import {
	LayersState,
	PropComponentLayerModifyValueState,
	SelectedLayerIdState,
	UndoRedoComponentState,
} from '../../../recoilState';
import { Layer } from '../../../../Common/types';
import { SvgModify } from '../Svg';

const App = () => {
	const [isClicked, setIsClicked] = useState(false);

	//현재 선택하고 있는 Layer의 ID
	const selectedLayerId = useRecoilValue(SelectedLayerIdState);

	//UI Schema용 전체 데이터 갱신을 위한 Reocil
	const [layers, setLayers] = useRecoilState(LayersState);
	const setUndoRedo = useSetRecoilState(UndoRedoComponentState);

	//PropComponents에서 임시로 저장한 값을 가져온다.
	const valueToChange = useRecoilValue(PropComponentLayerModifyValueState);

	const onClickHandlerModify = useCallback(() => {
		const nowInfo = { layers: layers, selectedLayerId: selectedLayerId };
		setUndoRedo((prev: any) => ({ undo: [...prev.undo, nowInfo], redo: [] }));
		setLayers((prev: Layer[]) => {
			if (!valueToChange) return prev;
			return prev.map((prevLayer: Layer) => {
				if (prevLayer.id === selectedLayerId) {
					//children 배열 안에서 modifyValue.id와 동일한 id를 가진 Layer를 찾아서 변경해준다.
					return {
						...prevLayer,
						children: prevLayer.children?.map((child: Layer) => {
							if (child.id === valueToChange.id) return valueToChange;
							return child;
						}),
					};
				}
				return prevLayer;
			});
		});
	}, [selectedLayerId, layers, valueToChange]);

	return (
		<motion.div
			className='fixed w-auto right-[24px] bottom-[24px]'
			initial={{ x: 50, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
		>
			<motion.button
				whileTap={{ scale: 0.97 }}
				onClick={() => {
					setIsClicked(!isClicked);
					onClickHandlerModify();
				}}
				className='w-[302px] h-auto py-3 px-4 rounded-md shadow-lg box-border space-x-10 flex flex-row items-center bg-pg-blue-dark text-white text-sm justify-between'
			>
				Change
				<motion.div
					animate={isClicked ? 'click' : 'none'}
					variants={{
						click: { rotate: 180 },
						none: { rotate: 0 },
					}}
					transition={{ duration: 0.2 }}
					style={{ originY: 0.5 }}
				>
					<SvgModify width={20} height={20} />
				</motion.div>
			</motion.button>
		</motion.div>
	);
};

export default App;
