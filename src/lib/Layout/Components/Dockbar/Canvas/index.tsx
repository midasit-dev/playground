import React from 'react';
import { Icon, SvgCanvasAdd } from '../Svg';
import { useAnimation } from 'framer-motion';

const strokeColors = [
	'#ff0000', // 빨강
	'#ff4000', // 빨강-주황
	'#ff8000', // 주황
	'#ffbf00', // 주황-노랑
	'#ffff00', // 노랑
	'#bfff00', // 노랑-초록
	'#80ff00', // 연두
	'#40ff00', // 초록-연두
	'#00ff00', // 초록
	'#00ff40', // 초록-청록
	'#00ff80', // 청록
	'#00ffbf', // 청록-민트
	'#00ffff', // 민트
	'#00bfff', // 민트-파랑
	'#0080ff', // 파랑
	'#0040ff', // 파랑-남색
	'#0000ff', // 남색
	'#4000ff', // 남색-보라
	'#8000ff', // 보라
	'#bf00ff', // 보라-자홍
	'#ff00ff', // 자홍
	'#ff00bf', // 자홍-핑크
	'#ff0080', // 핑크
	'#ff0040', // 핑크-빨강
];

export default function Canvas(props: any) {
	const [createMode, setCreateMode] = React.useState<boolean>(false);
	const controls = useAnimation();

	React.useEffect(() => {
		if (createMode) {
			controls.start({
				pathLength: [0, 1],
				stroke: strokeColors,
				transition: {
					duration: 1.5,
					ease: 'linear',
					repeat: Infinity,
					repeatType: 'reverse',
					stroke: { duration: 2, ease: 'linear', repeat: Infinity },
				},
			});
		} else {
			controls.start({
				pathLength: 1,
				stroke: '#fff',
				transition: { duration: 0.2 },
			});
		}
	}, [createMode, controls, strokeColors]);

	function onClickCanvasAddHandler() {
		setCreateMode(true);
	}

	return (
		<React.Fragment>
			<div style={{ cursor: 'pointer' }}>
				<Icon
					SVG={
						<SvgCanvasAdd
							createMode={createMode}
							strokeColors={strokeColors}
							animationControls={controls}
						/>
					}
					onClickHandler={onClickCanvasAddHandler}
				/>
			</div>
		</React.Fragment>
	);
}
