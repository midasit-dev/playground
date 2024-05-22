import { motion } from 'framer-motion';

export const Icon = (props: any) => {
	const { SVG, onClickHandler } = props;

	return (
		<motion.div
			className='w-5 h-5 rounded-md cursor-pointer'
			whileHover={{ scale: 1.2, rotate: 90, opacity: 0.5 }}
			whileTap={{ scale: 0.9 }}
			onClick={() => onClickHandler()}
		>
			{SVG}
		</motion.div>
	);
};

export const SvgClose = (props: any) => {
	const { color } = props;

	return (
		<svg
			width='100%'
			height='100%'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M17 7L7 17M7 7L17 17'
				stroke={color ?? '#62baf3'}
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};
