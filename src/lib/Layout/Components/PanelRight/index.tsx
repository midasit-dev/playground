import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { zindex_components_panel } from '../../../Common/zindex';
import { Icon, SvgExpand, SvgMinimize } from './Svg';
import Components from './Components';
import PropertiesToModify from './PropertiesToModify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PropComponentLayerModifyValueState, SelectedLayerIdState } from '../../recoilState';
import ModButton from './ModButton';

const App = () => {
	const [showPanel, setShowPanel] = React.useState(false);
	const selectedLayerId = useRecoilValue(SelectedLayerIdState);

	//Modify에 사용할 임시 저장공간을 가져온다.
	//최초에는 null이지만, Modify 버튼을 누르면 해당 Layer의 정보가 채워져 있다.
	//이 행위는 ModifyButton의 onClickHandler에서 이루어진다.
	const [valueToModify, setValueToModify] = useRecoilState(PropComponentLayerModifyValueState);

	//선택된 Layer가 달라졌을 경우 임시 공간을 비워 UI를 정리한다.
	useEffect(() => setValueToModify(null), [selectedLayerId, setValueToModify]);

	return (
		<motion.div
			initial={{ x: 200, opacity: 0 }}
			animate={{
				x: showPanel ? 0 : 350 - (24 + 20 + 24),
				opacity: 1
			}}
			className='fixed w-[350px] h-[calc(100vh-56px)] right-0 top-[56px] bg-gray-200 bg-opacity-90 p-6 box-border'
			style={{ zIndex: zindex_components_panel }}
		>
			<motion.div className='w-full h-auto flex flex-row items-center justify-between text-gray-600 text-sm font-semibold'>
				{showPanel ? (
					<Icon SVG={<SvgMinimize />} onClickHandler={() => setShowPanel(!showPanel)} />
				) : (
					<Icon SVG={<SvgExpand />} onClickHandler={() => setShowPanel(!showPanel)} />
				)}

				<p>Modify / Delete Components</p>
			</motion.div>

			<div className='w-full h-[1px] my-3'></div>

			<motion.div
				className='w-auto h-auto space-y-6'
				style={{ pointerEvents: selectedLayerId ? 'auto' : 'none' }}
				animate={{ opacity: selectedLayerId ? 1 : 0.6 }}
				exit={{ opacity: 0 }}
			>
				{valueToModify === null && <Components />}
				{valueToModify !== null && <PropertiesToModify />}
				{valueToModify !== null && <ModButton />}
			</motion.div>
		</motion.div>
	);
};

export default App;
