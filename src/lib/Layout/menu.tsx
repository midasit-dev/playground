import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // framer-motion 라이브러리를 임포트합니다.

export default function Menu(props: { openSideMenu: boolean }) {
	const { openSideMenu } = props;
	return (
		<>
			<AnimatePresence>
				{openSideMenu && (
					<motion.div
						initial={{ opacity: 0, x: -300 }} // 초기 상태
						animate={{ opacity: 1, x: 0 }} // 최종 상태
						exit={{ x: -200, opacity: 0 }} // 제거될 때의 상태. 왼쪽으로 슬라이드하며 투명해집니다.
						transition={{ duration: 1 }} // 애니메이션 전환 지속 시간
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
						Playground
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
