import { useEffect, useState } from 'react';
import { getAvailableMoauiCompKeys } from '../../MakeCompFunctions/AvailableComponents';
import { motion } from 'framer-motion';
import { Icon, SvgArrowDown } from '../Svg';
import { useRecoilState } from 'recoil';
import { SelectedAddComponentKey } from '../../../recoilState';
import { zindex_components_panel_add_comp_combo } from '../../../../Common/zindex';

const itemVariants = {
	open: {
		opacity: 1,
		y: 0,
		transition: { type: 'spring', stiffness: 300, damping: 24 },
	},
	closed: { opacity: 0, y: 20, transition: { duration: 0.1 } },
};

const App = () => {
	const [availableMoauiCompKeys, setAvailableMoauiCompKeys] = useState<string[]>([]);
	useEffect(() => {
		setAvailableMoauiCompKeys(getAvailableMoauiCompKeys());
	}, []);

	const [isOpen, setOpen] = useState(false);
	const [selectedAddComponentKey, setSelectedAddComponentKey] =
		useRecoilState(SelectedAddComponentKey);

	return (
		<motion.nav
			initial={false}
			animate={isOpen ? 'open' : 'closed'}
			className='relative'
			style={{ zIndex: zindex_components_panel_add_comp_combo }}
		>
			<motion.button
				whileTap={{ scale: 0.97 }}
				onClick={() => setOpen(!isOpen)}
				className='w-full h-auto py-3 px-4 rounded-md shadow-lg box-border space-x-10 flex flex-row items-center bg-gray-700 text-white text-sm justify-between'
			>
				{selectedAddComponentKey}
				<motion.div
					variants={{
						open: { rotate: 180 },
						closed: { rotate: 0 },
					}}
					transition={{ duration: 0.2 }}
					style={{ originY: 0.55 }}
				>
					<Icon SVG={<SvgArrowDown />} onClickHandler={() => {}} />
				</motion.div>
			</motion.button>
			<motion.ul
				variants={{
					open: {
						clipPath: 'inset(0% 0% 0% 0% round 6px)',
						transition: {
							type: 'spring',
							bounce: 0,
							duration: 0.7,
							delayChildren: 0.3,
							staggerChildren: 0.05,
						},
					},
					closed: {
						clipPath: 'inset(10% 50% 90% 50% round 6px)',
						transition: {
							type: 'spring',
							bounce: 0,
							duration: 0.3,
						},
					},
				}}
				style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
				className='bg-pg-black-medium bg-opacity-90 text-gray-400 text-sm px-4 py-3  overflow-hidden box-border space-y-3 w-full shadow-lg absolute top-14 left-0'
			>
				{availableMoauiCompKeys.map((compKey: string, index: number) => (
					<motion.li
						key={index}
						variants={itemVariants}
						className='cursor-pointer'
						whileHover={{ color: '#fff' }}
						whileTap={{ scale: 0.97 }}
						onClick={(e: any) => {
							setSelectedAddComponentKey(e.target.innerText);
							setOpen(false);
						}}
					>
						{compKey}
					</motion.li>
				))}
			</motion.ul>
		</motion.nav>
	);
};

export default App;
