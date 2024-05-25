import React, { Fragment } from 'react';
import { Icon, SvgSpacingPlus, SvgSpacingMinus } from '../Svg';
import {
	SelectedLayerGuideBoxPropsState,
	UndoRedoDockbar,
	UseDockbarState,
	DockbarIconRotationState,
} from '../../../recoilState';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { motion } from 'framer-motion';

const App = () => {
	//임시 저장할 guideBoxProps 상태 저장 리코일
	const [guideBoxProps, setGuideBoxProps] = useRecoilState(SelectedLayerGuideBoxPropsState);
	const setUndoRedoDockbar = useSetRecoilState(UndoRedoDockbar);
	const setUseDockbar = useSetRecoilState(UseDockbarState);
	const [rotation, setRotation] = useRecoilState(DockbarIconRotationState);

	return (
		<Fragment>
			<motion.div
				style={{ display: 'inline-block', cursor: 'pointer' }}
				animate={{ rotate: rotation }}
				transition={{ duration: 0.5 }}
			>
				<Icon
					SVG={<SvgSpacingPlus />}
					onClickHandler={() => {
						setUseDockbar(true);
						setUndoRedoDockbar((prev: any) => ({ undo: [...prev.undo, guideBoxProps], redo: [] }));
						setGuideBoxProps((prev: any) => {
							let result = { ...prev };
							if (result['spacing']) result = { ...result, spacing: result.spacing + 1 };
							else result = { ...result, spacing: 1 };
							return result;
						});
					}}
				/>
			</motion.div>
			<motion.div
				style={{ display: 'inline-block', cursor: 'pointer' }}
				animate={{ rotate: rotation }}
				transition={{ duration: 0.5 }}
			>
				<Icon
					SVG={<SvgSpacingMinus />}
					onClickHandler={() => {
						setUseDockbar(true);
						setUndoRedoDockbar((prev: any) => ({ undo: [...prev.undo, guideBoxProps], redo: [] }));
						setGuideBoxProps((prev: any) => {
							let result = { ...prev };
							if (result['spacing'] && result.spacing > 0)
								result = { ...result, spacing: result.spacing - 1 };
							return result;
						});
					}}
				/>
			</motion.div>
		</Fragment>
	);
};

export default App;
