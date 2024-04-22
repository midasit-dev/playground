import React from 'react';
import { useRecoilState } from 'recoil';
import { CanvasState, LayersState } from '../recoilState';
import { GuideBox, Panel, Separator } from '@midasit-dev/moaui';
import { Rnd } from 'react-rnd';
import { type Layer } from '../../Common/types';
import PanelSelectedLayerId from './PanelSelectedLayer';
import PanelOptionsAdd from './PanelOptionsAdd';
import PanelOptionsModifyDelete from './PanelOptionsModifyDelete';
import ToComponent from './ToComponent';
import '../SelectedLayer.css';
import { motion, AnimatePresence } from 'framer-motion'; // framer-motion 라이브러리를 임포트합니다.
import JSONImport from '../JsonOptions/Import';
import JSONExport from '../JsonOptions/Export';
import JSONView from '../JsonOptions/View';
import CODEOption from '../GenerateCode';

const App = () => {
	const [canvas] = useRecoilState(CanvasState);
	const [layers] = useRecoilState(LayersState);
	const [openJsonImportMenu, setOpenJsonImportMenu] = React.useState(false);
	const [openJsonExportMenu, setOpenJsonExportMenu] = React.useState(false);
	const [openJsonViewMenu, setOpenJsonViewMenu] = React.useState(false);
	const [openCodeOption, setOpenCodeOption] = React.useState(false);

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				style={{ width: '100%', height: '100%' }}
				className='bg-gray-100'
			>
				{openJsonImportMenu && (
					<JSONImport
						openJsonImportMenu={openJsonImportMenu}
						setOpenJsonImportMenu={setOpenJsonImportMenu}
					/>
				)}
				{openJsonExportMenu && (
					<JSONExport
						openJsonExportMenu={openJsonExportMenu}
						setOpenJsonExportMenu={setOpenJsonExportMenu}
					/>
				)}
				{openJsonViewMenu && <JSONView />}
				{openCodeOption && (
					<CODEOption openCodeMenu={openCodeOption} setOpenCodeMenu={setOpenCodeOption} />
				)}
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
					<div
						style={{ cursor: 'pointer', marginRight: '10px' }}
						onClick={() => {
							setOpenJsonImportMenu(true);
						}}
					>
						Import
					</div>
					<div
						style={{ marginRight: '10px', cursor: 'pointer' }}
						onClick={() => {
							setOpenJsonExportMenu(true);
						}}
					>
						Export
					</div>
					<div
						style={{ marginRight: '10px', cursor: 'pointer' }}
						onClick={() => {
							setOpenJsonViewMenu(true);
						}}
					>
						View
					</div>
					<div
						style={{ marginRight: '10px', cursor: 'pointer' }}
						onClick={() => {
							setOpenCodeOption(true);
						}}
					>
						Code
					</div>
				</div>
				<GuideBox row width='100%'>
					{/** Canvas 객체 */}
					<div className='w-full h-[calc(100vh-32px)] flex justify-center items-center'>
						<div
							className='shadow-xl shadow-black/5 rounded-md border border-pg-gray-medium max-w-full max-h-[calc(100vh-32px)] box-border flex flex-wrap content-start bg-white relative'
							style={{
								width: canvas.width,
								height: canvas.height,
							}}
						>
							{layers.map((layer: Layer, index: number) => {
								return <ToComponent key={index} layer={layer} />;
							})}
						</div>
					</div>

					<GuideBox>
						<div style={{ position: 'relative', width: 'auto', height: 'auto' }}>
							<Rnd default={{ x: -400 - 16 - 350, y: 0, width: 350, height: 0 }}>
								<PanelSelectedLayerId />
							</Rnd>
							<Rnd default={{ x: -400, y: 0, width: 400, height: 0 }}>
								<Panel
									width={400}
									variant='shadow2'
									padding={2}
									border='1px solid #d1d1d1'
									backgroundColor='#fff'
								>
									<GuideBox width='100%' spacing={2}>
										<PanelOptionsAdd />
										<Separator />
										<PanelOptionsModifyDelete />
									</GuideBox>
								</Panel>
							</Rnd>
						</div>
					</GuideBox>
				</GuideBox>
			</motion.div>
		</AnimatePresence>
	);
};

export default App;
