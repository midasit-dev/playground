import { useState } from 'react';
import { motion } from 'framer-motion';

const App = () => {
	const [clicked, setCliked] = useState(false);

	return (
		<div className='-ml-20 w-20 h-20 bottom-10 left-1/2 bg-white p-4 rounded-md shadow-md box-content fixed'>
			<motion.div
				className='w-20 h-20 rounded-md cursor-pointer'
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 0.9 }}
				style={{ background: clicked ? 'red' : 'gray' }}
				onClick={() => setCliked(!clicked)}
			/>
		</div>
	);
};

export default App;
