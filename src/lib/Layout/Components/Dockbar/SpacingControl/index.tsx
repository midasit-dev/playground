import React, { Fragment } from 'react';
import { Icon, SvgPlusCircle, SvgMinusCircle } from '../Svg';
import {
	SelectedLayerGuideBoxPropsState,
	UndoRedoDockbar,
	UseDockbarState,
} from '../../../recoilState';
import { useSetRecoilState, useRecoilState } from 'recoil';

const App = () => {
	//임시 저장할 guideBoxProps 상태 저장 리코일
	const [guideBoxProps, setGuideBoxProps] = useRecoilState(SelectedLayerGuideBoxPropsState);
	const setUndoRedoDockbar = useSetRecoilState(UndoRedoDockbar);
	const setUseDockbar = useSetRecoilState(UseDockbarState);

	return (
		<Fragment>
			<Icon
				SVG={<SvgPlusCircle />}
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
			<Icon
				SVG={<SvgMinusCircle />}
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
		</Fragment>
	);
};

export default App;
