import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	LayersState,
	SelectedLayerGuideBoxPropsState,
	SelectedLayerIdState,
	SelectedLayerState,
} from '../../recoilState';
import { zindex_dockbar } from '../../../Common/zindex';

import RowColumnToggle from './RowColumnToggle';
import CenterToggle from './CenterToggle';
import SpacingControl from './SpacingControl';
import { Layer, Layers } from '../../../Common/types';

const App = () => {
	//선택된 Layer Id
	const selectedLayerId = useRecoilValue(SelectedLayerIdState);
	//선택된 Layer Id의 Layer State
	const selectedLayerById = useRecoilValue(SelectedLayerState);
	//임시 저장할 guideBoxProps 상태 저장 리코일
	const [guideBoxProps, setGuideBoxProps] = useRecoilState(SelectedLayerGuideBoxPropsState);

	//선택된 Layer Id가 변경될 경우, guideBoxProps를 초기화
	useEffect(() => {
		if (selectedLayerId === null) setGuideBoxProps(null);
		else setGuideBoxProps(selectedLayerById ? selectedLayerById.props.guideBoxProps : null);
		// eslint-disable-next-line
	}, [selectedLayerId]);

	//guideBoxProps가 변경될 경우, Layer에 실시간 적용
	//내부 버튼들이 guideBoxProps를 각자 변경 한다. Spacing, RowColumn, Center, ...
	const [, setLayers] = useRecoilState(LayersState);
	useEffect(() => {
		if (!guideBoxProps) return;
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
		// eslint-disable-next-line
	}, [guideBoxProps]);

	return (
		<motion.div
			className='w-[392px] h-24 bottom-20 left-1/2 -ml-[196px] py-7 px-14 rounded-md shadow-lg box-border fixed space-x-10 flex flex-row items-center'
			style={{ zIndex: zindex_dockbar }}
			initial={{ y: 100, opacity: 0 }}
			animate={{
				y: 0,
				opacity: 1,
				backgroundColor: selectedLayerId ? '#0786c8' : '#62baf3',
			}}
		>
			<div
				className='w-auto space-x-10 flex flex-row items-center'
				style={{
					pointerEvents: selectedLayerId ? 'auto' : 'none',
					opacity: selectedLayerId ? 1 : 0.6,
				}}
			>
				<RowColumnToggle />
				<CenterToggle />
				<SpacingControl />
			</div>
		</motion.div>
	);
};

export default App;
