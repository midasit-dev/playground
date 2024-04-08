import React, { useEffect } from 'react';
import { GuideBox, Typography } from '@midasit-dev/moaui';
import SideBarButton from '../Shared/SideBarButton';
import JsonOptions from './JsonOptions';
import Layers from './Layers';
import Componentized from './Componentized';
import GenerateCode from './GenerateCode';
import Navbar from './navbar';
import Menu from './menu';

function useStateApp() {
	const [mode, setMode] = React.useState<'Layers' | 'Componentized'>('Layers');
	return { mode, setMode };
}

const App = () => {
	const { mode, setMode } = useStateApp();
	const [openSideMenu, setOpenSideMenu] = React.useState(false);
	const [openJsonMenu, setOpenJsonMenu] = React.useState(false);
	const [openCodeMenu, setOpenCodeMenu] = React.useState(false);

	//Toogle Menu Event 등록/삭제
	useEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.key === ']')
				setMode((prev: any) => (prev === 'Layers' ? 'Componentized' : 'Layers'));
		});

		return () => window.removeEventListener('keydown', () => {});
	}, [setMode]);

	return (
		<>
			<Navbar setOpenSideMenu={setOpenSideMenu} />
			<div onClick={() => setOpenSideMenu(false)} style={{ width: '100%', height: '1200px' }}>
				<Menu
					openSideMenu={openSideMenu}
					setOpenJsonMenu={setOpenJsonMenu}
					setOpenCodeMenu={setOpenCodeMenu}
				/>
				<GuideBox width='100%' height='inherit' spacing={2}>
					<GuideBox row width='100%' verCenter horSpaceBetween>
						<GuideBox row verCenter spacing={2} marginTop={7}>
							{openJsonMenu && <JsonOptions />}
							{openCodeMenu && <GenerateCode />}
						</GuideBox>
						{/** Sidebar Buttons */}
						<GuideBox height='inherit' row verCenter spacing={1} marginTop={7}>
							<Typography color='#a5a5a7'>Ctrl + ]</Typography>
							<GuideBox row verCenter>
								<SideBarButton
									currentMenuState={[mode, setMode]}
									iconName='Dashboard'
									menuName='Layers'
								/>
								<SideBarButton
									currentMenuState={[mode, setMode]}
									iconName='Adjust'
									menuName='Componentized'
								/>
							</GuideBox>
						</GuideBox>
					</GuideBox>

					<GuideBox width='100%' row height='inherit' spacing={3}>
						{mode === 'Layers' && <Layers />}
						{mode === 'Componentized' && <Componentized />}
					</GuideBox>
				</GuideBox>
			</div>
		</>
	);
};

export default App;
