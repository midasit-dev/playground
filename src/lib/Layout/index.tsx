import React, { useEffect, useState } from 'react';
import Layers from './Layers';
import Componentized from './Componentized';
import { motion } from 'framer-motion';
import DesignShowcase from './DesignShowcase';

export const modeName = ['Layers', 'Componentized'];

let tabs = [
	{ id: 'showcase', label: 'Showcase' },
	{ id: 'layers', label: 'Layers' },
	{ id: 'components', label: 'Components' },
];

const Navbar = (props: any) => {
	const { activeTab, setActiveTab } = props;
	const [ bottomline, setBottomLine ] = useState('');

	useEffect(() => {
		setBottomLine(activeTab !== 'showcase' ? 'border-b border-b-pg-gray-line' : '');
	}, [activeTab]);

	return (
		<div className={`flex space-x-6 w-full h-14 justify-center content-center backdrop-filter backdrop-blur-3xl bg-white bg-opacity-50 ${bottomline}`}>
			{tabs.map((tab) => (
				<motion.div
					key={tab.id}
					onClick={() => setActiveTab(tab.id)}
					className='relative pb-3 pt-[0.85rem] transition cursor-pointer'
				>
					{activeTab === tab.id && (
						<motion.span
							layoutId='bubble'
							className='absolute inset-0 z-10 bg-transparent py-5 border-b border-b-pg-blue-medium'
							transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
						/>
					)}

					<motion.p
						className='text-md'
						whileHover={{ color: '#62baf3' }}
						style={{
							color: activeTab === tab.id ? '#62baf3' : '#0f172a',
						}}
					>
						{tab.label}
					</motion.p>
				</motion.div>
			))}
		</div>
	);
};

const App = () => {
	const [activeTab, setActiveTab] = useState(tabs[0].id);

	return (
		<>
			<Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
			<div style={{ width: '100%' }}>
				<div className='w-full h-inherit'>
					<div className='w-full h-inherit'>
						{activeTab === 'showcase' && <DesignShowcase />}
						{activeTab === 'layers' && <Layers />}
						{activeTab === 'components' && <Componentized />}
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
