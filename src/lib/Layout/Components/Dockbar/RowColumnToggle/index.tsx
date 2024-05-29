import React from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { Icon, SvgRowColumn } from '../Svg';
import {
	SelectedLayerGuideBoxPropsState,
	UndoRedoDockbar,
	UseDockbarState,
	DockbarIconRotationState,
} from '../../../recoilState';
import { motion } from 'framer-motion';

const App = () => {
	//임시 저장할 guideBoxProps 상태 저장 리코일
	const [guideBoxProps, setGuideBoxProps] = useRecoilState(SelectedLayerGuideBoxPropsState);
	const setUndoRedoDockbar = useSetRecoilState(UndoRedoDockbar);
	const setUseDockbar = useSetRecoilState(UseDockbarState);
	const [rotation, setRotation] = useRecoilState(DockbarIconRotationState);

	React.useEffect(() => {
		if (!guideBoxProps) return;
		if (guideBoxProps['row']) setRotation(0);
		else setRotation(90);
	}, [guideBoxProps]);

	function rotateHandler() {
		setRotation(rotation + 90);
	}

	return (
		<div>
			{guideBoxProps && (
				<motion.div
					style={{ cursor: 'pointer' }}
					animate={{ rotate: rotation }}
					onClick={rotateHandler}
					transition={{ duration: 0.5 }}
				>
					<Icon
						SVG={<SvgRowColumn />}
						onClickHandler={() => {
							setUseDockbar(true);
							setUndoRedoDockbar((prev: any) => ({
								undo: [...prev.undo, guideBoxProps],
								redo: [],
							}));
							setGuideBoxProps((prev: any) => {
								let result = { ...prev };
								if (result['row']) delete result['row'];
								else result = { ...result, row: true };
								return result;
							});
						}}
					/>
				</motion.div>
			)}
		</div>
	);
};

export default App;
