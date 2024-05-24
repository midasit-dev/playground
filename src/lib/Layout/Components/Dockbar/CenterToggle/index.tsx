import { useSetRecoilState, useRecoilState } from 'recoil';
import { Icon, SvgCenter } from '../Svg';
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
		<Icon
			SVG={<SvgCenter />}
			onClickHandler={() => {
				setUseDockbar(true);
				setUndoRedoDockbar((prev: any) => ({ undo: [...prev.undo, guideBoxProps], redo: [] }));
				setGuideBoxProps((prev: any) => {
					let result = { ...prev };
					if (result['center']) delete result['center'];
					else result = { ...result, center: true };
					return result;
				});
			}}
		/>
	);
};

export default App;
