import { useState } from 'react';
import { Icon, SvgMore } from '../Svg';
import { motion } from 'framer-motion';
import Toggle from './ToggleSwitch';
import { zindex_dockbar_more } from '../../../../Common/zindex';

const guideBoxPositionPropKeys = [
	'center',
	'horLeft',
	'horRight',
	'horCenter',
	'horSpaceBetween',
	'verTop',
	'verBottom',
	'verCenter',
	'verSpaceBetween',
];

const App = () => {
	const [isOn, setIsOn] = useState(false);

	return (
		<div>
			<Icon SVG={<SvgMore />} onClickHandler={() => setIsOn(!isOn)} />
			<motion.div
				className='w-[250px] h-auto py-6 px-6 rounded-md shadow-lg box-border justify-center border border-[#e5e7e8] opacity-80 flex flex-col space-y-1 bg-white bg-opacity-80'
				animate={{
					opacity: isOn ? 1 : 0,
					display: isOn ? 'flex' : 'none',
					position: 'absolute',
					bottom: isOn ? 80 : 50,
					right: 0,
					pointerEvents: isOn ? 'auto' : 'none',
					zIndex: isOn ? zindex_dockbar_more : -1,
				}}
			>
				{guideBoxPositionPropKeys.map((key: string, index: number) => (
					<Toggle name={key} key={index} />
				))}
			</motion.div>
		</div>
	);
};

export default App;
