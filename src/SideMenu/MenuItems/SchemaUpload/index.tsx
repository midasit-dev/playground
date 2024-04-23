import React, { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { SvgUpload } from '../Svg';
import { useSetRecoilState } from 'recoil';
import { AppSchemaStateForImport } from '../../../recoilState';
import { Schema } from '../../../lib';

const variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

const App = () => {
	const setAppSchemaStateForImport = useSetRecoilState(AppSchemaStateForImport);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const onClickHandler = useCallback(() => {
		//DOM의 Input을 클릭하는 것처럼!
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	}, []);

	const handleFileChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e: any) => {
					const contents = e.target?.result as string;
					try {
						if (contents) {
							const schema: Schema = JSON.parse(contents);
							setAppSchemaStateForImport(schema);
						}
					} catch (err) {
						console.error('JSON 파일을 파싱하는 중 오류가 발생했습니다:', err);
					}
				};
				reader.readAsText(file);
			} else {
				console.error('파일이 선택되지 않았습니다.');
			}
		},
		[setAppSchemaStateForImport],
	);

	return (
		<motion.li
			variants={variants}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
			className='m-0 p-0 list-none mb-5 flex items-center cursor-pointer'
			onClick={onClickHandler}
		>
			<div className='w-10 h-10 flex-[40px 0] items-center cursor-pointer mr-5'>
				<SvgUpload />
			</div>
			<input
				type='file'
				ref={fileInputRef}
				className='hidden'
				onClick={(e: any) => {
					//같은 파일 재 선택 시, onChange가 동작하지 않는 걸 방지 하기 위해!
					e.target.value = null;
				}}
				onChange={handleFileChange}
				accept='.json'
			/>
			<p className='flex-[1] text-[#D309E1] text-xl'>Schema Upload</p>
		</motion.li>
	);
};

export default App;
