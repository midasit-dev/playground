import React from 'react';
import './navbar.css'; // 스타일 시트 불러오기
import { Icon, IconButton, Typography, GuideBox } from '@midasit-dev/moaui';
import ModeButton from '../Shared/ModeButton';
import ModeSwitch from './modeSwitch';

function Navbar(props: { setOpenSideMenu: any; setMode: any; mode: string }) {
	const { setOpenSideMenu, setMode, mode } = props;

	return (
		<div className='navbar'>
			<div style={{ width: '20%', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
				{/* <IconButton transparent onClick={() => setOpenSideMenu(true)}>
					<Icon iconName='Menu' />
				</IconButton> */}
			</div>
			<div
				style={{ width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			>
				<Typography size='medium'>{mode}</Typography>	
			</div>
			<div style={{ width: '20%', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
				<GuideBox height='inherit' row verCenter spacing={1}>
					<ModeSwitch setMode={setMode} />
					{/* <Typography color='#a5a5a7'>Ctrl + ]</Typography>
					<GuideBox row verCenter>
						<ModeButton currentMenuState={[mode, setMode]} iconName='Dashboard' menuName='Layers' />
						<ModeButton
							currentMenuState={[mode, setMode]}
							iconName='Adjust'
							menuName='Componentized'
						/>
					</GuideBox> */}
				</GuideBox>
			</div>
		</div>
	);
}

export default Navbar;
