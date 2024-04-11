import React, { useEffect } from 'react';
import { GuideBox, Typography } from '@midasit-dev/moaui';
import ModeButton from '../Shared/ModeButton';
import JsonOptions from './JsonOptions';
import ExportJson from './JsonOptions/Export';
import ImportJson from './JsonOptions/Import';
import Layers from './Layers';
import Componentized from './Componentized';
import GenerateCode from './GenerateCode';
import Navbar from './navbar';
import Menu from './menu';
import { omit } from 'lodash';

function useStateApp() {
	const [mode, setMode] = React.useState<'Layers' | 'Componentized'>('Layers');
	return { mode, setMode };
}

const App = () => {
	const { mode, setMode } = useStateApp();
	const [openSideMenu, setOpenSideMenu] = React.useState(false);
	const [openCodeMenu, setOpenCodeMenu] = React.useState(false);
	const [openJsonImportMenu, setOpenJsonImportMenu] = React.useState(false);
	const [openJsonExportMenu, setOpenJsonExportMenu] = React.useState(false);

	//Toogle Menu Event 등록/삭제
	useEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.key === ']')
				setMode((prev: any) => (prev === 'Layers' ? 'Componentized' : 'Layers'));
		});

		return () => window.removeEventListener('keydown', () => {});
	}, [setMode]);

	const onClickOutside = React.useCallback(() => {
		setOpenSideMenu(false);
		setOpenJsonImportMenu(false);
		setOpenJsonExportMenu(false);
		setOpenCodeMenu(false);
	}, [setOpenSideMenu, setOpenJsonImportMenu, setOpenJsonExportMenu, setOpenCodeMenu]);

	return (
		<>
			<Navbar setOpenSideMenu={setOpenSideMenu} setMode={setMode} mode={mode} />
			<Menu
				openSideMenu={openSideMenu}
				setOpenJsonImportMenu={setOpenJsonImportMenu}
				setOpenJsonExportMenu={setOpenJsonExportMenu}
				setOpenCodeMenu={setOpenCodeMenu}
			/>
			<div onClick={onClickOutside} style={{ width: '100%', height: '2000px' }}>
				<GuideBox width='100%' height='inherit' marginTop={0}>
					{/* <GuideBox row width='100%' verCenter > */}
					<div
						style={{ position: 'fixed', marginLeft: '10px' }}
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						<GuideBox row verCenter spacing={2} marginTop={7}>
							{openJsonImportMenu && <ImportJson openJsonImportMenu={openJsonImportMenu} />}
							{openJsonExportMenu && <ExportJson openJsonExportMenu={openJsonExportMenu} />}
							{openCodeMenu && <GenerateCode />}
						</GuideBox>
					</div>
					{/** Sidebar Buttons */}
					{/* <GuideBox height='inherit' row verCenter spacing={1} marginTop={7}>
							<Typography color='#a5a5a7'>Ctrl + ]</Typography>
							<GuideBox row verCenter>
								<ModeButton
									currentMenuState={[mode, setMode]}
									iconName='Dashboard'
									menuName='Layers'
								/>
								<ModeButton
									currentMenuState={[mode, setMode]}
									iconName='Adjust'
									menuName='Componentized'
								/>
							</GuideBox>
						</GuideBox> */}
					{/* </GuideBox> */}

					<GuideBox width='100%' row height='inherit' spacing={3} marginTop={7}>
						{mode === 'Layers' && <Layers />}
						{mode === 'Componentized' && <Componentized />}
					</GuideBox>
				</GuideBox>
			</div>
		</>
	);
};

export default App;
