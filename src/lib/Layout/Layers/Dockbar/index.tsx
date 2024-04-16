import { useState } from 'react';
import { motion } from 'framer-motion';

const App = () => {
	const [clicked, setCliked] = useState(false);

	return (
		<div
			style={{
				width: 80,
				height: 80,
				position: 'fixed',
				bottom: 50,
				left: '50%',
				marginLeft: -75,
				background: 'hsla(0, 0%, 100%, 0.2)',
				padding: 20,
				borderRadius: 20,
				boxShadow: '0 2px 3px 0 hsla(0, 0%, 0%, 0.07),0 10px 15px 0 hsla(0, 0%, 0%, 0.05)',
			}}
		>
			<motion.div
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 0.9 }}
				style={{
					background: clicked ? 'red' : 'white',
					width: 80,
					height: 80,
					cursor: 'pointer',
				}}
				onClick={() => setCliked(!clicked)}
			/>
		</div>
	);
};

export default App;
