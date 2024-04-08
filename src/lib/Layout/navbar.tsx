import React from 'react';
import './navbar.css'; // 스타일 시트 불러오기
import { Icon, IconButton } from '@midasit-dev/moaui';

function Navbar(props: { setOpenSideMenu: any }) {
	const { setOpenSideMenu } = props;
	return (
		<div className='navbar'>
			<IconButton transparent onClick={() => setOpenSideMenu(true)}>
				<Icon iconName='Menu' />
			</IconButton>
		</div>
	);
}

export default Navbar;
