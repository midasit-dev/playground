import { motion } from 'framer-motion';
import { Icon, SvgSettingCanvasMove } from './../Svg';

const App = () => {
	return (
		<motion.div className='w-auto h-auto py-6 px-6 rounded-md shadow-lg box-border justify-center border border-[#e5e7e8] opacity-80'>
			<Icon SVG={<SvgSettingCanvasMove />} onClickHandler={() => console.log('move')} />
		</motion.div>
	);
};

export default App;
