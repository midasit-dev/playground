import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const Backdrop = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ImageWrapper = styled.div`
	width: 500px;
	height: 500px;
	border-radius: 50%;
	overflow: hidden;
	display: inline-block;
	margin: 10px;
`;

const Button = styled.button`
	margin: 20px;
	position: fixed;
	top: 0;
	z-index: 100;
`;

function ImageDiv() {
	return (
		<div
			style={{
				widht: 'auto',
				height: '500px',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<ImageWrapper>
				<img src='./image1.png' alt='image1' width={'500px'} height={'500px'} />
			</ImageWrapper>
			<ImageWrapper>
				<img src='./image2.png' alt='image2' width={'500px'} height={'500px'} />
			</ImageWrapper>
			<ImageWrapper>
				<img src='./image3.png' alt='image3' width={'500px'} height={'500px'} />
			</ImageWrapper>
		</div>
	);
}

function ImageTest() {
	const [startAnimation, setStartAnimation] = useState(false);

	// 애니메이션이 끝난 후 호출될 함수
	const handleAnimationComplete = () => {
		setStartAnimation(false);
	};

	return (
		<>
			<AnimatePresence>
				{startAnimation && (
					<Backdrop
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={handleAnimationComplete}
					>
						<motion.div
							key='imageDiv'
							// initial={{ x: '100vw' }}
							// animate={{ x: '-100vw' }}
							// popup
							initial={{ scale: 0 }}
							animate={{ scale: 1, rotate: 360 }}
							transition={{
								duration: 2,
								type: 'spring',
								stiffness: 100,
								damping: 20,
							}}
							exit={{ scale: 0, rotate: 0 }}
						>
							<ImageDiv />
						</motion.div>
					</Backdrop>
				)}
			</AnimatePresence>
			<Button onClick={() => setStartAnimation(!startAnimation)} sx={{ mt: '20px' }}>
				사진 보기
			</Button>
		</>
	);
}

export default ImageTest;
