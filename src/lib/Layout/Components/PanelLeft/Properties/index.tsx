import ToPropComponents from './../../MakeCompFunctions/ToPropComponents';
import { useRecoilValue } from 'recoil';
import { SelectedAddComponentKey } from '../../../recoilState';
import { motion } from 'framer-motion';

const App = () => {
	const seledctedAddComponentKey = useRecoilValue(SelectedAddComponentKey);

	return (
		<motion.div className='w-full' animate={{ y: 0 }}>
			<ToPropComponents componentType={seledctedAddComponentKey} customHookType='Add' />
		</motion.div>
	);
};

export default App;
