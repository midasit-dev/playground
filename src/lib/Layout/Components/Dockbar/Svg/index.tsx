import { motion } from 'framer-motion';

export const Icon = (props: any) => {
	const { SVG, onClickHandler, isEnable } = props;

	return (
		<motion.div
			className='w-10 h-10 rounded-md cursor-pointer'
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.9 }}
			onClick={() => onClickHandler()}
			style={{
				pointerEvents: isEnable === undefined || isEnable === true ? 'auto' : 'none',
				opacity: isEnable === undefined || isEnable === true ? 1 : 0.5,
			}}
		>
			{SVG}
		</motion.div>
	);
};

//icons! https://www.untitledui.com/free-icons
export const SvgRowColumn = () => (
	<svg
		width='100%'
		height='100%'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M17.8 10C18.9201 10 19.4802 10 19.908 9.78201C20.2843 9.59027 20.5903 9.28431 20.782 8.90798C21 8.48016 21 7.92011 21 6.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.7157 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3L6.2 3C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.07989 3 6.2L3 6.8C3 7.9201 3 8.48016 3.21799 8.90798C3.40973 9.28431 3.71569 9.59027 4.09202 9.78201C4.51984 10 5.07989 10 6.2 10L17.8 10Z'
			stroke='#fff'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M17.8 21C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V17.2C21 16.0799 21 15.5198 20.782 15.092C20.5903 14.7157 20.2843 14.4097 19.908 14.218C19.4802 14 18.9201 14 17.8 14L6.2 14C5.0799 14 4.51984 14 4.09202 14.218C3.71569 14.4097 3.40973 14.7157 3.21799 15.092C3 15.5198 3 16.0799 3 17.2L3 17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8Z'
			stroke='#fff'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export const SvgUndo = () => (
	<svg
		width='100%'
		height='100%'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M9 14L4 9M4 9L9 4M4 9H10.4C13.7603 9 15.4405 9 16.7239 9.65396C17.8529 10.2292 18.7708 11.1471 19.346 12.2761C20 13.5595 20 15.2397 20 18.6V20'
			stroke='#fff'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export const SvgRedo = () => (
	<svg
		width='100%'
		height='100%'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M4 20V18.6C4 15.2397 4 13.5595 4.65396 12.2761C5.2292 11.1471 6.14708 10.2292 7.27606 9.65396C8.55953 9 10.2397 9 13.6 9H20M20 9L15 14M20 9L15 4'
			stroke='#fff'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export const SvgCenter = () => (
	<svg
		width='100%'
		height='100%'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M18 10H6M21 6H3M21 14H3M18 18H6'
			stroke='#fff'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export const SvgSpacingPlus = () => (
	<svg
		width='100%'
		height='100%'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M6 12H10.5M6 12L8 9M6 12L8 15M18 12H13.5M18 12L16 9M18 12L16 15M21 21V3M3 21V3'
			stroke='#fff'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export const SvgSpacingMinus = () => (
	<svg
		width='100%'
		height='100%'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M12 3V21M22 12H15.5M15.5 12L19.5 16M15.5 12L19.5 8M2 12H8.5M8.5 12L4.5 16M8.5 12L4.5 8'
			stroke='#fff'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export const SvgMore = () => (
	<svg
		width='100%'
		height='100%'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M8.4 3H4.6C4.03995 3 3.75992 3 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3 3.75992 3 4.03995 3 4.6V8.4C3 8.96005 3 9.24008 3.10899 9.45399C3.20487 9.64215 3.35785 9.79513 3.54601 9.89101C3.75992 10 4.03995 10 4.6 10H8.4C8.96005 10 9.24008 10 9.45399 9.89101C9.64215 9.79513 9.79513 9.64215 9.89101 9.45399C10 9.24008 10 8.96005 10 8.4V4.6C10 4.03995 10 3.75992 9.89101 3.54601C9.79513 3.35785 9.64215 3.20487 9.45399 3.10899C9.24008 3 8.96005 3 8.4 3Z'
			stroke='#fff'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M19.4 3H15.6C15.0399 3 14.7599 3 14.546 3.10899C14.3578 3.20487 14.2049 3.35785 14.109 3.54601C14 3.75992 14 4.03995 14 4.6V8.4C14 8.96005 14 9.24008 14.109 9.45399C14.2049 9.64215 14.3578 9.79513 14.546 9.89101C14.7599 10 15.0399 10 15.6 10H19.4C19.9601 10 20.2401 10 20.454 9.89101C20.6422 9.79513 20.7951 9.64215 20.891 9.45399C21 9.24008 21 8.96005 21 8.4V4.6C21 4.03995 21 3.75992 20.891 3.54601C20.7951 3.35785 20.6422 3.20487 20.454 3.10899C20.2401 3 19.9601 3 19.4 3Z'
			stroke='#fff'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M19.4 14H15.6C15.0399 14 14.7599 14 14.546 14.109C14.3578 14.2049 14.2049 14.3578 14.109 14.546C14 14.7599 14 15.0399 14 15.6V19.4C14 19.9601 14 20.2401 14.109 20.454C14.2049 20.6422 14.3578 20.7951 14.546 20.891C14.7599 21 15.0399 21 15.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7951 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V15.6C21 15.0399 21 14.7599 20.891 14.546C20.7951 14.3578 20.6422 14.2049 20.454 14.109C20.2401 14 19.9601 14 19.4 14Z'
			stroke='#fff'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M8.4 14H4.6C4.03995 14 3.75992 14 3.54601 14.109C3.35785 14.2049 3.20487 14.3578 3.10899 14.546C3 14.7599 3 15.0399 3 15.6V19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7951 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H8.4C8.96005 21 9.24008 21 9.45399 20.891C9.64215 20.7951 9.79513 20.6422 9.89101 20.454C10 20.2401 10 19.9601 10 19.4V15.6C10 15.0399 10 14.7599 9.89101 14.546C9.79513 14.3578 9.64215 14.2049 9.45399 14.109C9.24008 14 8.96005 14 8.4 14Z'
			stroke='#fff'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export const SvgTag = () => {
	return (
		<svg
			width='100%'
			height='100%'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M9.49999 3L6.49999 21M17.5 3L14.5 21M20.5 8H3.5M19.5 16H2.5'
				stroke='#fff'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export const SvgCanvasAdd = ({
	createMode,
	strokeColors,
	animationControls,
}: {
	createMode: boolean;
	strokeColors: string[];
	animationControls: any;
}) => (
	<svg
		width='100%'
		height='100%'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<motion.path
			d='M20 10.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M18 21V15M15 18H21'
			stroke={createMode ? strokeColors[0] : '#fff'}
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			initial={{ pathLength: 1, stroke: '#fff' }} // 아이콘이 처음부터 완전히 보이도록 설정
			animate={animationControls}
		/>
	</svg>
);
