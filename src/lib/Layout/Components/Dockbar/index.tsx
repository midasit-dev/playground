import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	LayersState,
	SelectedLayerGuideBoxPropsState,
	SelectedLayerIdState,
	SelectedLayerState,
	UndoRedoComponentState,
	UseDockbarState,
} from '../../recoilState';
import { zindex_dockbar } from '../../../Common/zindex';

import RowColumnToggle from './RowColumnToggle';
import CenterToggle from './CenterToggle';
import SpacingControl from './SpacingControl';
import More from './More';
import Tag from './Tag';
import UndoRedo from './UndoRedo';
import { Layer, Layers } from '../../../Common/types';

const App = (props:{Undo:any, Redo:any}) => {
	//선택된 Layer Id
	const selectedLayerId = useRecoilValue(SelectedLayerIdState);
	//선택된 Layer Id의 Layer State
	const selectedLayerById = useRecoilValue(SelectedLayerState);
	//임시 저장할 guideBoxProps 상태 저장 리코일
	const [guideBoxProps, setGuideBoxProps] = useRecoilState(SelectedLayerGuideBoxPropsState);

	const [useDockbar, setUseDockbar] = useRecoilState(UseDockbarState);
	//선택된 Layer Id가 변경될 경우, guideBoxProps를 초기화
	useEffect(() => {
		if (selectedLayerId !== null) {
			setGuideBoxProps(
				selectedLayerById
					? { ...selectedLayerById.props.guideBoxProps, id: selectedLayerById.id }
					: null,
			);
		}
		// eslint-disable-next-line
	}, [selectedLayerId]);

	//guideBoxProps가 변경될 경우, Layer에 실시간 적용
	//내부 버튼들이 guideBoxProps를 각자 변경 한다. Spacing, RowColumn, Center, ...
	const [layers, setLayers] = useRecoilState(LayersState);
	const setUndoRedo = useSetRecoilState(UndoRedoComponentState);

	useEffect(() => {
		if (!useDockbar) return;
		const nowInfo = { layers: layers, selectedLayerId: selectedLayerId };
		setUndoRedo((prev: any) => ({ undo: [...prev.undo, nowInfo], redo: [] }));
		setLayers((prev: Layers) => {
			return prev.map((layer: Layer) => {
				if (layer.id === selectedLayerId) {
					return {
						...layer,
						props: {
							...layer.props,
							guideBoxProps: guideBoxProps,
						},
					};
				}
				return layer;
			});
		});
		setUseDockbar(false);
		// eslint-disable-next-line
	}, [useDockbar]);

	return (
		<motion.div
			className='w-[690px] h-24 bottom-20 left-1/2 -ml-[345px] py-7 px-14 rounded-md shadow-lg box-border fixed space-x-10 flex flex-row items-center'
			style={{ zIndex: zindex_dockbar }}
			initial={{ y: 100, opacity: 0 }}
			animate={{
				y: 0,
				opacity: 1,
				backgroundColor: selectedLayerId ? '#0786c8' : '#62baf3',
			}}
		>
			<div
				className='w-auto space-x-8 flex flex-row items-center'
				style={{
					pointerEvents: selectedLayerId ? 'auto' : 'none',
					opacity: selectedLayerId ? 1 : 0.6,
				}}
			>
				<RowColumnToggle />
				<SpacingControl />
				<UndoRedo Undo={props.Undo} Redo={props.Redo}/>
				<div className='border border-pg-blue-medium w-[1px] h-[30px]' />
				<div className='relative w-auto items-center'>
					<CenterToggle />
				</div>
				<div className='relative w-auto items-center'>
					<More />
				</div>
				<div className='relative w-auto items-center'>
					<Tag />
				</div>
			</div>
		</motion.div>
	);
};

export default App;
