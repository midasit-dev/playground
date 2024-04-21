import React from 'react';
import { motion } from 'framer-motion';

export const Icon = (props: any) => {
	const { SVG, onClickHandler } = props;

	return (
		<motion.div
			className='w-4 h-4 rounded-md cursor-pointer'
			whileTap={{ scale: 0.9 }}
			onClick={() => onClickHandler()}
		>
			{SVG}
		</motion.div>
	);
};

const SvgExpand = () => (
	<div className='w-4 h-4'>
		<svg
			width='100%'
			height='100%'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M8 12L12 16M12 16L16 12M12 16V8M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z'
				stroke='currentColor'
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	</div>
);

const ShowHideButton = (props: {
	state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) => {
	const { state } = props;
	const [show, setShow] = state;

	const [isOpen, setOpen] = React.useState(false);

	return (
		<motion.div
			className='w-auto h-auto py-[6px] px-4 rounded-md box-border space-x-10 flex flex-row items-center text-white text-xs bg-gray-700 cursor-pointer'
			initial={false}
			animate={isOpen ? 'open' : 'closed'}
			whileTap={{ scale: 0.97 }}
			onClick={() => {
				setShow(!show);
				setOpen(!isOpen);
			}}
		>
			<motion.div
				variants={{
					open: { rotate: 180 },
					closed: { rotate: 0 },
				}}
				transition={{ duration: 0.2 }}
				style={{ originY: 0.5 }}
			>
				<SvgExpand />
			</motion.div>
		</motion.div>
	);
};

export default ShowHideButton;
