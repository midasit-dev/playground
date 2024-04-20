import React from 'react';
import { motion } from 'framer-motion';
import { zindex_components_panel } from '../../../Common/zindex';
import { Icon, SvgExpand, SvgMinimize } from './Svg';

const App = () => {
	const [showPanel, setShowPanel] = React.useState(true);

	return (
		<motion.div
			initial={{ x: 200, opacity: 0 }}
			animate={{
				x: showPanel ? 0 : 350 - (24 + 20 + 24),
				opacity: showPanel ? 1 : 0.6,
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
		</motion.div>
	);
};

export default App;
