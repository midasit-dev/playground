import { useSetRecoilState, useRecoilState } from 'recoil';
import { Icon, SvgRow, SvgColumn } from '../Svg';
import {
	SelectedLayerGuideBoxPropsState,
	UndoRedoDockbar,
	UseDockbarState,
} from '../../../recoilState';

const App = () => {
	//임시 저장할 guideBoxProps 상태 저장 리코일
	const [guideBoxProps, setGuideBoxProps] = useRecoilState(SelectedLayerGuideBoxPropsState);
	const setUndoRedoDockbar = useSetRecoilState(UndoRedoDockbar);
	const setUseDockbar = useSetRecoilState(UseDockbarState);

	return (
		<div>
		<Icon
			SVG={<SvgRow />}
			onClickHandler={() => {
				setUseDockbar(true);
				setUndoRedoDockbar((prev: any) => ({ undo: [...prev.undo, guideBoxProps], redo: [] }));
				setGuideBoxProps((prev: any) => {
					let result = { ...prev };
					if (result['row']) delete result['row'];
					else result = { ...result, row: true };
					return result;
				});
			}}
		/>
		</div>
	);
};

export default App;
