import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // framer-motion 라이브러리를 임포트합니다.
import styled from 'styled-components';
import { Typography, Button } from '@midasit-dev/moaui';

const duration = 0.2; // 애니메이션 전환 지속 시간을 0.5초로 설정합니다.

const commonStyle = {
	marginLeft: '15px',
	marginTop: '10px',
	marginBottom: '10px',
	backgroundColor: 'transparent',
	borderLeft: '2px solid gray',
	paddingLeft: '10px',
	height: '25px',
	display: 'flex',
	alignItems: 'center',
	cursor: 'pointer',
};

const commonAnimation = {
	initial: { opacity: 0, x: -100 }, // 초기 상태
	animate: { opacity: 1, x: 0 }, // 최종 상태
	transition: { delay: duration, duration: duration }, // 딜레이 0.8초, 애니메이션 전환 지속 시간 0.5초
};

const StyledMotionDiv = styled(motion.div)`
	${commonStyle};
	&:hover {
		border-left: 2px solid skyblue;
		font-weight: 500;
	}
`;

export default function Menu(props: {
	openSideMenu: boolean;
	setOpenJsonMenu: any;
	setOpenCodeMenu: any;
}) {
	const { openSideMenu, setOpenJsonMenu, setOpenCodeMenu } = props;

	const onClickJson = React.useCallback(() => {
		setOpenJsonMenu(true);
	}, [setOpenJsonMenu]);

	const onClickCode = React.useCallback(() => {
		setOpenCodeMenu(true);
	}, [setOpenCodeMenu]);

	return (
		<>
			<AnimatePresence>
				{openSideMenu && (
					<motion.div
						initial={{ opacity: 0, x: -300 }} // 초기 상태
						animate={{ opacity: 1, x: 0 }} // 최종 상태
						exit={{ x: -200, opacity: 0 }} // 제거될 때의 상태. 왼쪽으로 슬라이드하며 투명해집니다.
						transition={{ duration: duration }} // 애니메이션 전환 지속 시간
						style={{
							width: '300px',
							backgroundColor: 'rgba(255, 255, 255, 0.5)',
							height: '1200px',
							zIndex: 1000,
							position: 'fixed',
							borderRight: '1px solid rgba(0, 0, 0, 0.1)',
							backdropFilter: 'blur(10px)',
							padding: '20px',
						}}
					>
						<div style={{ padding: '10px 10px' }}>
							<Typography>Playground</Typography>
						</div>
						<StyledMotionDiv {...commonAnimation} onClick={onClickJson}>
							JSON
						</StyledMotionDiv>
						<StyledMotionDiv
							{...commonAnimation}
							transition={{ delay: duration + 0.2, duration: duration }}
							onClick={onClickCode}
						>
							CODE
						</StyledMotionDiv>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
