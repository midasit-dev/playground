import React from 'react';
import './navbar.css'; // 스타일 시트 불러오기
import { GuideBox, Icon, IconButton, Panel, Typography } from '@midasit-dev/moaui';

function Navbar() {
	return (
		<div className='navbar'>
			<IconButton transparent onClick={() => {}}>
				<Icon iconName='Menu' />
			</IconButton>
		</div>
	);
}

export default Navbar;
