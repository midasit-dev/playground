import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CanvasState, ShowCaseBoxState, LayersState } from '../recoilState';
import { motion, AnimatePresence } from 'framer-motion';
import ShowBox from './showbox';
import ColorfulBg from './colorfulBg';
import Layout from './ai-components/Abracadabra';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ISuggest } from './ai-components/defs/Interface';
import Converter from './ai-components/defs/Converter';
import ShowTime from './ai-components/Showtime';
import { ConvertResult } from '../../Common/types';

const queryClient = new QueryClient();

export default function DesignShowcase() {
	const [startX, setStartX] = React.useState(0);
	const [startY, setStartY] = React.useState(0);
	const showtimeRef = React.useRef<{doStartJob: any}>({doStartJob: new Promise((resolve: any) => resolve(""))});

	//Recoil
	const [canvasState, setCanvasState] = useRecoilState(CanvasState);
	const setLayersState = useSetRecoilState(LayersState);

	React.useEffect(() => {
		const handleResize = () => {
			const calcX = window.innerWidth / 2 - canvasState.width / 2;
			setStartX(calcX);
			const calcY = window.innerHeight / 2 - canvasState.height / 2 - 32;
			setStartY(calcY);
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	async function onClickShowButton(item: ISuggest) {
		setLayersState([]);
		const result : ConvertResult = await Converter(item, '');
		setCanvasState(result.uiSchema.canvas);
		for (const item of result.uiSchema.layers) {
			await showtimeRef.current.doStartJob(item);
			setLayersState((prev) => [...prev, item]);
		}
	}

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
						top: startY,
						left: startX,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{startX !== 0 && startY !== 0 && <ShowBox key='ShowBox' />}
				</div>
			</motion.div>
			<ShowTime startX={startX} startY={startY} ref={showtimeRef} />
			<QueryClientProvider client={queryClient}>
				<Layout onItemClick={onClickShowButton} />
			</QueryClientProvider>
		</div>
	);
}
