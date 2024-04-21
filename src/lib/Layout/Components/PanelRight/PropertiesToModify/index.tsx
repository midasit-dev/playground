import ToPropComponents from './../../MakeCompFunctions/ToPropComponents';
import { useRecoilState } from 'recoil';
import { PropComponentLayerModifyValueState } from '../../../recoilState';
import { motion } from 'framer-motion';
import { SvgBack } from '../Svg';

const App = () => {
	const [valueToModify, setValueToModify] = useRecoilState(PropComponentLayerModifyValueState);

	return (
		<motion.div className='w-full' initial={{ x: 25, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
			{valueToModify && (
				<div className='w-full h-auto'>
					<motion.button
						className='w-full h-auto py-3 px-4 rounded-md shadow-lg box-border space-x-10 flex flex-row items-center bg-gray-700 text-white text-sm justify-between cursor-pointer'
						onClick={() => setValueToModify(null)}
						whileTap={{ scale: 0.97 }}
					>
						<SvgBack />
						{valueToModify?.id}
					</motion.button>

					<div className='w-full h-[1px] my-3'></div>

					<ToPropComponents
						componentType={valueToModify.type}
						customProps={valueToModify.props}
						customHookType='Modify'
					/>

					<div className='w-full h-[1px] my-3'></div>
				</div>
			)}
		</motion.div>
	);
};

export default App;
