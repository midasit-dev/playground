import * as React from 'react';
import { motion } from 'framer-motion';

const Path = (props) => {
	const { isopen, ...rest } = props;
	return (
		<motion.path
			fill='transparent'
			strokeWidth='3'
			stroke={props.isopen ? 'white' : '#0f172a'}
			strokeLinecap='round'
			{...rest}
		/>
	);
};

export const MenuToggle = (props: { isopen: boolean; toggle: any }) => (
	<button
		onClick={props.toggle}
		// style={styleButton}
		className=' outline-none border-none cusor-pointer absolute top-[4px] left-[20px] w-[50px] h-[50px] rounded-[50%] bg-transparent'
	>
		<svg width='23' height='23' viewBox='0 0 23 23' fill='red'>
			<Path
				variants={{
					closed: { d: 'M 2 2.5 L 20 2.5' },
					open: { d: 'M 3 16.5 L 17 2.5' },
				}}
				isopen={props.isopen}
			/>
			<Path
				d='M 2 9.423 L 20 9.423'
				variants={{
					closed: { opacity: 1 },
					open: { opacity: 0 },
				}}
				transition={{ duration: 0.1 }}
				isopen={props.isopen}
			/>
			<Path
				variants={{
					closed: { d: 'M 2 16.346 L 20 16.346' },
					open: { d: 'M 3 2.5 L 17 16.346' },
				}}
				isopen={props.isopen}
			/>
		</svg>
	</button>
);
