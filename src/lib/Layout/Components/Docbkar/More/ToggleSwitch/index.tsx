import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { SelectedLayerGuideBoxPropsState } from '../../../../recoilState';

const App = (props: any) => {
	const { name } = props;
	const [isOn, setIsOn] = useState(false);

	//임시 저장할 guideBoxProps 상태 저장 리코일
	const [guideboxProps, setGuideBoxProps] = useRecoilState(SelectedLayerGuideBoxPropsState);

	const toggleSwitch = useCallback(() => {
		const cur = !isOn;
		setIsOn(cur);

		setGuideBoxProps((prev: any) => {
			let result = { ...prev };
			if (result[name]) delete result[name];
			else result = { ...result, [name]: true };
			return result;
		});
	}, [isOn, name, setGuideBoxProps]);

	//현재 상태에 따라 토글 스위치 위치 변경
	useEffect(() => {
		//@ts-ignore
		if (guideboxProps[name]) setIsOn(true);
		else setIsOn(false);
	}, [guideboxProps, name]);

	return (
		<div className='w-full justify-between items-center flex flex-row relative'>
			<p className='text-gray-600 text-xs'>{name}</p>
			<div
				className='absolute top-[14px] right-[6px] w-6 h-0 z-0'
				style={{
					borderTop: isOn ? '1px solid #62baf3' : '1px solid #394150',
				}}
			/>
			<div
				className='w-10 h-[28px] bg-transparent bg-opacity-40 flex rounded-md cursor-pointer p-1'
				onClick={toggleSwitch}
				style={{ justifyContent: isOn ? 'flex-end' : 'flex-start' }}
			>
				<motion.div
					className='w-5 h-5 rounded-[20px] z-10'
					layout
					transition={{ type: 'spring', stiffness: 700, damping: 30 }}
					animate={{
						backgroundColor: isOn ? '#62baf3' : '#394150',
					}}
				/>
			</div>
		</div>
	);
};

export default App;
