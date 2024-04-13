import { useState } from 'react';
import { motion } from 'framer-motion';
import './styles.css';

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
				className='layers-dockbar-item'
				whileHover={{ scale: 1.2, rotate: 90 }}
				whileTap={{
					scale: 0.8,
					rotate: -90,
					borderRadius: '100%',
				}}
				style={{
					background: clicked ? 'red' : 'white',
				}}
				onClick={() => setCliked(!clicked)}
			/>
		</div>
	);
};

export default App;
