import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShowBox from './showbox';
import ColorfulBg from './colorfulBg';

export default function DesignShowcase() {
	return (
		<div
			style={{
				width: '100%',
				height: 'calc(100vh - 32px)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: "hidden"
			}}
		>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{
					duration: 0.5,
					type: 'easeInOut',
				}}
			>
				<AnimatePresence>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5, type: 'easeInOut' }}
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							zIndex: -1,
						}}
					>
						<ColorfulBg key='chat-login-background' />
					</motion.div>
				</AnimatePresence>
				<ShowBox />
			</motion.div>
		</div>
	);
}
