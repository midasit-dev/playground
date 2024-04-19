import React from 'react';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { GuideLayerVisibleState } from 'src/lib/Layout/recoilState';

const Toggle = () => {
	const [isOn, setIsOn] = useRecoilState(GuideLayerVisibleState);
	const toggleSwitch = () => setIsOn(!isOn);

	return (
		<div
			className='w-20 h-[50px] bg-white bg-opacity-40 flex rounded-[25px] p-[5px] cursor-pointer'
			onClick={toggleSwitch}
			style={{ justifyContent: isOn ? 'flex-end' : 'flex-start' }}
		>
			<motion.div
				className='w-10 h-10 rounded-[40px]'
				layout
				transition={{ type: 'spring', stiffness: 700, damping: 30 }}
				animate={{
					backgroundColor: isOn ? '#85ff00' : '#fff',
				}}
			/>
		</div>
	);
};

export default Toggle;
