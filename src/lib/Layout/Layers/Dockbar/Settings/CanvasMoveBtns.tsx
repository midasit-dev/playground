import { motion } from 'framer-motion';
import { Icon, SvgSettingCanvasMoveDown, SvgSettingCanvasMoveUp } from '../Svg';
import { useRecoilState } from 'recoil';
import { CanvasMarginState } from '../../../recoilState';

const gap = 32;

const App = () => {
	const [, setMargin] = useRecoilState(CanvasMarginState);

	return (
		<motion.div className='w-auto h-auto py-6 px-6 rounded-md shadow-lg box-border justify-center border border-[#e5e7e8] bg-opacity-80 flex flex-row space-x-5 bg-white'>
			<Icon
				SVG={<SvgSettingCanvasMoveUp />}
				onClickHandler={() =>
					setMargin((pre: any) => {
						return { ...pre, marginTop: pre.marginTop - gap };
					})
				}
			/>
			<Icon
				SVG={<SvgSettingCanvasMoveDown />}
				onClickHandler={() =>
					setMargin((pre: any) => {
						return { ...pre, marginTop: pre.marginTop + gap };
					})
				}
			/>
		</motion.div>
	);
};

export default App;
