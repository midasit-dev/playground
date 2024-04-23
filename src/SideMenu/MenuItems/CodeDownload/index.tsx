import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { SvgCode } from '../Svg';
import { useRecoilValue } from 'recoil';
import { AppSchemaStateForExport } from '../../../recoilState';
import { transformSchemaToExportCodes, type ExportCodes } from '../../../lib';
import { v4 as uuid4 } from 'uuid';

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
	const appSchemaStateForExport = useRecoilValue(AppSchemaStateForExport);
	const onClickHandler = useCallback(() => {
		const exportCodes: ExportCodes = transformSchemaToExportCodes(appSchemaStateForExport);
		const json = JSON.stringify(exportCodes, null, 2);
		const blob = new Blob([json], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `code-${uuid4().slice(0, 8)}.json`;
		a.click();
		URL.revokeObjectURL(url);
	}, [appSchemaStateForExport]);

	return (
		<motion.li
			variants={variants}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
			className='m-0 p-0 list-none mb-5 flex items-center cursor-pointer'
			onClick={onClickHandler}
		>
			<div className='w-10 h-10 flex-[40px 0] items-center cursor-pointer mr-5'>
				<SvgCode />
			</div>
			<p className='flex-[1] text-[#9C1AFF] text-xl'>Code Download</p>
		</motion.li>
	);
};

export default App;
