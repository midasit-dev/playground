import React from 'react';
import { Icon, Tooltip, GuideBox } from '@midasit-dev/moaui';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import PaletteIcon from '@mui/icons-material/Palette';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import MuseumIcon from '@mui/icons-material/Museum';
import MuseumOutlinedIcon from '@mui/icons-material/MuseumOutlined';

const modeName = ['Layers', 'Componentized'];
const buttonSpace = 6;

export default function ModeButtons(props: any) {
	const { mode, setMode } = props;

	function onClickHandler(modeName: string) {
		setMode(modeName);
	}

	return (
		<>
			<div
				style={{
					width: '100px',
					height: '40px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'transparent',
				}}
			>
				<div
					style={{ marginRight: buttonSpace, cursor: 'pointer', zIndex: 1000 }}
					onClick={() => {
						onClickHandler(modeName[0]);
					}}
				>
					{mode === modeName[0] ? <MuseumIcon /> : <MuseumOutlinedIcon />}
				</div>
				<div
					style={{ marginRight: buttonSpace, cursor: 'pointer' }}
					onClick={() => {
						onClickHandler(modeName[1]);
					}}
				>
					{mode === modeName[1] ? <DashboardCustomizeIcon /> : <DashboardCustomizeOutlinedIcon />}
				</div>
				<div
					style={{ cursor: 'pointer' }}
					onClick={() => {
						onClickHandler(modeName[2]);
					}}
				>
					{mode === modeName[2] ? <PaletteIcon /> : <PaletteOutlinedIcon />}
				</div>
			</div>
			{/* <div style={{position:"absolute", width:"30px", height:"30px", backgroundColor:"#FFF", borderRadius:"5px",marginRight:buttonSpace}}/> */}
		</>
	);
}
