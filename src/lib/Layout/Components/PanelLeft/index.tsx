import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { zindex_components_panel } from '../../../Common/zindex';
import { Icon, SvgExpand, SvgMinimize } from './Svg';
import ComboBox from './ComboBox';
import Properties from './Properties';
import AddButton from './AddButton';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	PropComponentLayerAddValueState,
	SelectedAddComponentKey,
	SelectedLayerIdState,
	SelectedLayerState,
} from '../../recoilState';
import { Layer } from '../../../Common/types';
import { v4 as uuid4 } from 'uuid';
import Moaui from '@midasit-dev/moaui';

const App = () => {
	const [showPanel, setShowPanel] = React.useState(true);

	//선택한 Layer Id (Selected Layer Id)
	const selectedLayerId = useRecoilValue(SelectedLayerIdState);

	//선택한 Layer의 상태 (Selected Layer)
	const selectedLayer = useRecoilValue(SelectedLayerState);

	//Add Component할 콤보박스에서 선택한 Type (Type for add)
	const selectedaddCompnentKey = useRecoilValue(SelectedAddComponentKey);

	//Component Type이 변경되면 propCompLayerAddValue를 초기화 (Data for add)
	const [, setPropCompLayerAddValue] = useRecoilState(PropComponentLayerAddValueState);

	useEffect(() => {
		if (!selectedaddCompnentKey) return;

		setPropCompLayerAddValue((prev: Layer) => {
			const isEqualType = selectedaddCompnentKey === prev.type;
			// console.log(isEqualType, prev.type, selectedaddCompnentKey);

			//생성 시점 UUID 기록
			const addUUID = uuid4().slice(0, 8);
			const countChildrenLength = (selectedLayer?.children?.length || 0) + 1;
			const newId = `${countChildrenLength}-${selectedaddCompnentKey}-${addUUID}`;

			//이전과 컴포넌트가 다른 타입이면, props를 초기화한다.
			//children과 같은 형태는 props에 넣으면 오류가 있으므로 우선 제외한다.
			//ToPropComponents.tsx 참고 (Function하고 Map type은 우선 제외한다.)
			let newProps: { [key: string]: any } = {};
			if (!isEqualType) {
				const sampleProps = Moaui[(selectedaddCompnentKey + 'Sample') as keyof typeof Moaui] as {
					[key: string]: any;
				};
				for (const key of Object.keys(sampleProps)) {
					if (sampleProps[key] instanceof Map) continue;
					if (typeof sampleProps[key] === 'function') continue;
					if (typeof sampleProps[key] === 'object') continue;

					newProps[key] = sampleProps[key];
				}
			}
			return {
				id: newId,
				type: selectedaddCompnentKey,
				props: isEqualType ? prev.props : newProps,
				children: isEqualType ? prev.children : [],
			};
		});
	}, [setPropCompLayerAddValue, selectedLayer?.children, selectedaddCompnentKey]);

	return (
		<motion.div
			initial={{ x: -200, opacity: 0 }}
			animate={{
				x: showPanel ? 0 : -350 + (24 + 20 + 24),
				opacity: showPanel ? 1 : 0.6,
			}}
			className='fixed w-[350px] h-[calc(100vh-56px)] left-0 top-[56px] bg-gray-200 bg-opacity-90 p-6 box-border flex flex-col'
			style={{ zIndex: zindex_components_panel }}
		>
			<motion.div className='w-full h-auto flex flex-row items-center justify-between text-gray-600 text-sm font-semibold'>
				<p>Add Components</p>
				{showPanel ? (
					<Icon SVG={<SvgMinimize />} onClickHandler={() => setShowPanel(!showPanel)} />
				) : (
					<Icon SVG={<SvgExpand />} onClickHandler={() => setShowPanel(!showPanel)} />
				)}
			</motion.div>

			<div className='w-full h-[1px] my-3'></div>

			<motion.div
				className='w-auto h-auto space-y-6'
				style={{ pointerEvents: selectedLayerId ? 'auto' : 'none' }}
				animate={{ opacity: selectedLayerId ? 1 : 0.6 }}
			>
				<ComboBox />
				<Properties />
				<AddButton />
			</motion.div>
		</motion.div>
	);
};

export default App;
