import React from 'react';
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { CanvasState, LayersState, PythonState } from '../recoilState';
import { loadingTargetStateAtom, fetchingStateAtom } from './ai-components/defs/atom';
import { motion, AnimatePresence } from 'framer-motion';
import ShowBox from './showbox';
import ColorfulBg from './colorfulBg';
import Layout from './ai-components/Abracadabra';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ISuggest } from './ai-components/defs/Interface';
import Converter from './ai-components/defs/Converter';
import ShowTime from './ai-components/Showtime';
import { ConvertResult } from '../../Common/types';
import InfinitLoading from './Loading/InfinitLoading';
const queryClient = new QueryClient();

export default function DesignShowcase() {
	const [startX, setStartX] = React.useState(0);
	const [startY, setStartY] = React.useState(0);
	const showtimeRef = React.useRef<{ doStartJob: any }>({
		doStartJob: new Promise((resolve: any) => resolve('')),
	});
	const [loading, setLoading] = React.useState(false);
	const resetLoadingTarget = useResetRecoilState(loadingTargetStateAtom);
	const setFetchingState = useSetRecoilState(fetchingStateAtom);

	//RecoilF
	const [canvasState, setCanvasState] = useRecoilState(CanvasState);
	const setLayersState = useSetRecoilState(LayersState);
	const setPython = useSetRecoilState(PythonState);

	React.useEffect(() => {
		const x = window.innerWidth / 2 - canvasState.width / 2;
		const y = window.innerHeight / 2 - canvasState.height / 2;
		setStartX(x);
		setStartY(y);
	}, []);

	React.useEffect(() => {
		setLoading(true);
	}, [canvasState.height, canvasState.width]);

	React.useEffect(() => {
		if (loading) {
			setTimeout(() => {
				const x = window.innerWidth / 2 - canvasState.width / 2;
				const y = window.innerHeight / 2 - canvasState.height / 2;
				setStartX(x);
				setStartY(y);
				setLoading(false);
			}, 1500);
		}
	}, [loading]);

	async function onClickShowButton(item: ISuggest) {
		try {
			setFetchingState(true);
			setLayersState([]);
			const result: ConvertResult = await Converter(item, '');
			for (const item of result.uiSchema.layers) {
				await showtimeRef.current.doStartJob(item);
				setLayersState((prev) => [...prev, item]);
			}
			setTimeout(() => {
				setCanvasState(result.uiSchema.canvas);
				setPython((prev) => ({ ...prev, rawCode: item.function }));
				setPython((prev) => ({ ...prev, pySchema: { schema: item.schema } }));
				setPython((prev) => ({ ...prev, argumentComponent: result.pyArgumentComponent }));
			}, 1000);
		} catch {
		} finally {
			resetLoadingTarget();
			setFetchingState(false);
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
						top: startY - 60,
						left: startX,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{loading && (
						<InfinitLoading x={window.innerWidth / 2 - 55} y={window.innerHeight / 2 - 60} />
					)}
					{startX !== 0 && startY !== 0 && !loading && <ShowBox key='ShowBox' />}
				</div>
			</motion.div>
			<ShowTime startX={startX} startY={startY} ref={showtimeRef} />
			<QueryClientProvider client={queryClient}>
				<Layout onItemClick={onClickShowButton} />
			</QueryClientProvider>
		</div>
	);
}
