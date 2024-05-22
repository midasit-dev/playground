import { useSetRecoilState } from 'recoil';
import { Icon, SvgCenter } from '../Svg';
import { SelectedLayerGuideBoxPropsState } from '../../../recoilState';

const App = () => {
	//임시 저장할 guideBoxProps 상태 저장 리코일
	const setGuideBoxProps = useSetRecoilState(SelectedLayerGuideBoxPropsState);

	return (
		<Icon
			SVG={<SvgCenter />}
			onClickHandler={() => {
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
