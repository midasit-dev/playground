import { motion } from 'framer-motion';

export const Icon = (props: any) => {
	const { SVG, onClickHandler } = props;

	return (
		<motion.div
			className='w-5 h-5 rounded-md cursor-pointer'
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.9 }}
			onClick={() => onClickHandler()}
		>
			{SVG}
		</motion.div>
	);
};

//icons! https://www.untitledui.com/free-icons
export const SvgMinimize = () => (
	<svg
		width='100%'
		height='100%'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M4 14H10M10 14V20M10 14L3 21M20 10H14M14 10V4M14 10L21 3'
			stroke='#4b5563'
			stroke-width='2'
			stroke-linecap='round'
			stroke-linejoin='round'
		/>
	</svg>
);

export const SvgExpand = () => (
	<svg
		width='100%'
		height='100%'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M14 10L21 3M21 3H15M21 3V9M10 14L3 21M3 21H9M3 21L3 15'
			stroke='#4b5563'
			stroke-width='2'
			stroke-linecap='round'
			stroke-linejoin='round'
		/>
	</svg>
);

export const SvgArrowDown = () => (
	<svg
		width='100%'
		height='100%'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M6 9L12 15L18 9'
			stroke='#fff'
			stroke-width='2'
			stroke-linecap='round'
			stroke-linejoin='round'
		/>
	</svg>
);
