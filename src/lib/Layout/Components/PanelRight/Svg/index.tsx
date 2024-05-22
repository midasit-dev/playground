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
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
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
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export const SvgBack = () => (
	<div className='w-5 h-5'>
		<svg
			width='100%'
			height='100%'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M19 12H5M5 12L12 19M5 12L12 5'
				stroke='#fff'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	</div>
);

export const SvgModify = (props: any) => {
	const { width, height } = props;

	return (
		<div
			style={{
				width: width ?? 16,
				height: height ?? 16,
			}}
		>
			<svg
				width='100%'
				height='100%'
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M12 5.5L7.36159 12.2468C7.08236 12.6529 6.94275 12.856 6.95113 13.0248C6.95843 13.1718 7.03015 13.3082 7.14716 13.3975C7.28151 13.5 7.52794 13.5 8.02082 13.5H12V18.5L16.6384 11.7532C16.9176 11.3471 17.0573 11.144 17.0489 10.9752C17.0416 10.8282 16.9699 10.6918 16.8528 10.6025C16.7185 10.5 16.4721 10.5 15.9792 10.5H12V5.5Z'
					stroke='#fff'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
					stroke='#fff'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		</div>
	);
};
