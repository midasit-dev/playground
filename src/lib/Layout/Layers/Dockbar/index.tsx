import React from 'react';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { LayerRenderingBoxesState, LayersState } from '../../recoilState';
import { Icon, SvgPreDelete, SvgAllDelete, SvgSettingCanvas } from './Svg';
import Toggle from './Toggle';
import Settings from './Settings';
import { zindex_dockbar } from '../../../Common/zindex';

const App = (props: any) => {
	const { preDeleteLayerHandler, allDeleteLayersHandler } = props;
	const layers = useRecoilValue(LayersState);
	const boxes = useRecoilValue(LayerRenderingBoxesState);

	const [isOn, setIsOn] = React.useState(false);

	return (
		<motion.div
			className='w-[550px] h-24 bottom-20 left-1/2 -ml-[275px] bg-pg-blue-dark py-7 px-14 rounded-md shadow-lg box-border fixed space-x-10 flex flex-row items-center'
			style={{ zIndex: zindex_dockbar }}
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
		>
			<div className='w-auto space-x-10 flex flex-row items-center'>
				<Toggle />
				<Icon SVG={<SvgPreDelete />} onClickHandler={preDeleteLayerHandler} />
				<Icon SVG={<SvgAllDelete />} onClickHandler={allDeleteLayersHandler} />
			</div>
			<motion.p
				className='text-[2rem] text-white cursor-default items-center'
				whileHover={{ color: '#62baf3', scale: 1.2 }}
				style={{ opacity: layers.length === 0 ? 0.4 : 1 }}
				onClick={() => {
					console.log('Current Layers: ', layers);
					console.log('Current Boxes: ', boxes);
				}}
			>
				{toFormatting(layers.length)}
			</motion.p>
			<div className='border border-pg-blue-medium w-[1px] h-[30px]' />
			<div className='relative w-auto flex flex-row items-center'>
				<Icon
					SVG={<SvgSettingCanvas color={isOn ? '#62baf3' : '#fff'} />}
					onClickHandler={() => setIsOn(!isOn)}
				/>
				<Settings isOn={isOn} />
			</div>
		</motion.div>
	);
};

export default App;

//formatting counts of layers (ex. 01, 02, 03, ...)
//if 00 -> '-'
const toFormatting = (count: number) => {
	return String(count).padStart(2, '0');
};
