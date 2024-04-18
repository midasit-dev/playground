import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { LayersState } from '../../recoilState';

const App = (props: any) => {
	const { preDeleteLayerHandler, allDeleteLayersHandler } = props;

	const layers = useRecoilValue(LayersState);

	return (
		<div className='w-48 h-10 bottom-20 left-1/2 -ml-[152px] bg-pg-blue-dark py-7 px-14 rounded-md shadow-lg box-content fixed space-x-10 flex flex-row'>
			<div className='w-auto space-x-10 flex flex-row'>
				<Icon SVG={<PreDeleteIcon />} onClickHandler={preDeleteLayerHandler} />
				<Icon SVG={<AllDeleteIcon />} onClickHandler={allDeleteLayersHandler} />
			</div>
			<motion.p
				className='text-3xl text-white cursor-default'
				whileHover={{ color: '#62baf3', scale: 1.2 }}
			>
				{toFormatting(layers.length)}
			</motion.p>
		</div>
	);
};

export default App;

//formatting counts of layers (ex. 01, 02, 03, ...)
//if 00 -> '-'
const toFormatting = (count: number) => {
	if (count === 0) return '--';
	return String(count).padStart(2, '0');
};

const Icon = (props: any) => {
	const { SVG, onClickHandler } = props;

	return (
		<motion.div
			className='w-10 h-10 rounded-md cursor-pointer'
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.9 }}
			onClick={() => onClickHandler()}
		>
			{SVG}
		</motion.div>
	);
};

//icons! https://www.untitledui.com/free-icons
const PreDeleteIcon = () => (
	<svg
		width='100%'
		height='100%'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M17 9L11 15M11 9L17 15M2.72 12.96L7.04 18.72C7.392 19.1893 7.568 19.424 7.79105 19.5932C7.9886 19.7432 8.21232 19.855 8.45077 19.9231C8.72 20 9.01334 20 9.6 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H9.6C9.01334 4 8.72 4 8.45077 4.07689C8.21232 4.14499 7.9886 4.25685 7.79105 4.40675C7.568 4.576 7.392 4.81067 7.04 5.28L2.72 11.04C2.46181 11.3843 2.33271 11.5564 2.28294 11.7454C2.23902 11.9123 2.23902 12.0877 2.28294 12.2546C2.33271 12.4436 2.46181 12.6157 2.72 12.96Z'
			stroke='#fff'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const AllDeleteIcon = () => (
	<svg
		width='100%'
		height='100%'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5'
			stroke='#fff'
			stroke-width='2'
			stroke-linecap='round'
			stroke-linejoin='round'
		/>
	</svg>
);
