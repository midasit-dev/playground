import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CanvasState, ShowCaseBoxState } from '../recoilState';
import { motion, AnimatePresence } from 'framer-motion';
import ShowBox from './showbox';
import ColorfulBg from './colorfulBg';
import Layout from './ai-components/Abracadabra';
import { QueryClient, QueryClientProvider } from 'react-query';
import { IListItem } from "./ai-components/defs/Interface";

const queryClient = new QueryClient();

export default function DesignShowcase() {
	const [startX, setStartX] = React.useState(0);

	//Recoil
	const canvasState = useRecoilValue(CanvasState);

	React.useEffect(() => {
		const handleResize = () => {
			console.log('DesignShowcase mounted');
			const calcX = window.innerWidth / 2 - canvasState.width / 2;
			console.log('calcX', calcX);
			setStartX(calcX);
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			console.log('DesignShowcase unmounted');
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div
			style={{
				width: '100%',
				height: 'calc(100vh - 32px)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
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
				<div
					style={{
						width: '100%',
						height: '100%',
						position: 'absolute',
						top: '20%',
						left: startX,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<ShowBox />
				</div>
			</motion.div>
			<QueryClientProvider client={queryClient}>
				<Layout onItemClick={(item: IListItem) => {}} />
			</QueryClientProvider>
		</div>
	);
}
