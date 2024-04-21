import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { CanvasState } from '../../../recoilState';

const App = () => {
	const [canvas, setCanvas] = useRecoilState(CanvasState);
	const [isEdit, setIsEdit] = useState(false);

	return (
		<motion.div
			className='w-[300px] h-auto py-6 px-14 rounded-md shadow-lg box-border justify-center bg-opacity-80'
			animate={{
				border: isEdit ? '1px solid #0786c8' : '1px solid #e5e7e8',
				backgroundColor: isEdit ? '#0786c8' : '#fff',
			}}
		>
			{!isEdit && (
				<p className='text-3xl text-pg-black-medium text-center' onClick={() => setIsEdit(true)}>
					{canvas.width} x {canvas.height}
				</p>
			)}

			{isEdit && (
				<input
					autoFocus
					className='p-0 w-48 rounded-md focus:outline-none bg-transparent text-white text-3xl placeholder-pg-gray-medium'
					placeholder={` ... ${canvas.width} x ${canvas.height}`}
					type='text'
					onKeyDown={(e: any) => {
						if (e.key === 'Escape') {
							setIsEdit(false);
						}

						if (e.key === 'Enter') {
							//e.target.value === '100 x 100' -> width: 100, height: 100
							setCanvas((pre: any) => {
								const curValue = e.target.value;
								const [width, height] = curValue
									.split('x')
									.map((num: string) => parseInt(num.trim()));
								return {
									...pre,
									width: width,
									height: height,
								};
							});
							setIsEdit(false);
						}
					}}
				></input>
			)}
		</motion.div>
	);
};

export default App;
