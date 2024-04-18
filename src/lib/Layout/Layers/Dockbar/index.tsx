import React from 'react';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { LayersState } from '../../recoilState';
import { Icon, SvgPreDelete, SvgAllDelete, SvgResizeCanvas } from './Svg';
import Toggle from './Toggle';
import Settings from './Settings';

const App = (props: any) => {
	const { preDeleteLayerHandler, allDeleteLayersHandler } = props;
	const layers = useRecoilValue(LayersState);

	const [isOn, setIsOn] = React.useState(false);

	return (
		<div className='w-[550px] h-24 bottom-20 left-1/2 -ml-[275px] bg-pg-blue-dark py-7 px-14 rounded-md shadow-lg box-border fixed space-x-10 flex flex-row items-center'>
			<div className='w-auto space-x-10 flex flex-row items-center'>
				<Toggle />
				<Icon SVG={<SvgPreDelete />} onClickHandler={preDeleteLayerHandler} />
				<Icon SVG={<SvgAllDelete />} onClickHandler={allDeleteLayersHandler} />
			</div>
			<motion.p
				className='text-[2rem] text-white cursor-default items-center'
				whileHover={{ color: '#62baf3', scale: 1.2 }}
				style={{ opacity: layers.length === 0 ? .4 : 1, }}
			>
				{toFormatting(layers.length)}
			</motion.p>
			<div className='border border-pg-blue-medium w-[1px] h-[30px]' />
			<div className='relative w-auto flex flex-row items-center'>
				<Icon SVG={<SvgResizeCanvas color={isOn ? '#62baf3' : '#fff'} />} onClickHandler={() => setIsOn(!isOn)} />
				<motion.div
					className='w-[304px] h-[88px] py-6 px-14 absolute -top-[130px] right-0 bg-transparent'
					animate={{
						opacity: isOn ? 1 : 0,
						display: isOn ? 'block' : 'none',
						top: isOn ? -130 : -100,
						pointerEvents: isOn ? 'auto' : 'none',
					}}
				>
					<Settings />
				</motion.div>
			</div>
		</div>
	);
};

export default App;

//formatting counts of layers (ex. 01, 02, 03, ...)
//if 00 -> '-'
const toFormatting = (count: number) => {
	return String(count).padStart(2, '0');
};
