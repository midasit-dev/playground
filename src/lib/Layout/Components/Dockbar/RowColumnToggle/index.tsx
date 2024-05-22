import { useSetRecoilState } from 'recoil';
import { Icon, SvgRowToggle } from '../Svg';
import { SelectedLayerGuideBoxPropsState } from '../../../recoilState';

const App = () => {
	//임시 저장할 guideBoxProps 상태 저장 리코일
	const setGuideBoxProps = useSetRecoilState(SelectedLayerGuideBoxPropsState);

	return (
		<Icon
			SVG={<SvgRowToggle />}
			onClickHandler={() => {
				setGuideBoxProps((prev: any) => {
					let result = { ...prev };
					if (result['row']) delete result['row'];
					else result = { ...result, row: true };
					return result;
				});
			}}
		/>
	);
};

export default App;
