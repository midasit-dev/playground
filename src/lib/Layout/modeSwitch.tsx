import React, { useState } from 'react';
import './modeSwitch.css'; // 스타일 파일 임포트
import { Icon } from '@midasit-dev/moaui'; // 아이콘 라이브러리 임포트
const Switch = (props: { setMode: any }) => {
	const { setMode } = props;
	const [isChecked, setIsChecked] = useState(false);

	const toggleSwitch = () => {
		setIsChecked(!isChecked);
		setMode(!isChecked ? 'Componentized' : 'Layers');
	};

	return (
		<label className='switch'>
			<input type='checkbox' checked={isChecked} onChange={toggleSwitch} />
			<span className='slider'></span>
			<span className={isChecked ? 'layer' : 'checkedlayer'}>
				<Icon iconName={isChecked ? 'DashboardOutlined' : 'Dashboard'} /> {/* 'Dashboard' 아이콘은 오른쪽에 위치 */}
			</span>
			<span className={isChecked ? 'uncheckedcomponentized' : 'componentized'}>
				<Icon iconName={isChecked ? 'Palette' : 'PaletteOutlined'} /> {/* 'Adjust' 아이콘은 왼쪽에 위치 */}
			</span>
		</label>
	);
};

export default Switch;
