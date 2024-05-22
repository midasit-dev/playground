import React, { Fragment } from 'react';
import { Icon, SvgPlusCircle, SvgMinusCircle } from '../Svg';
import { SelectedLayerGuideBoxPropsState } from '../../../recoilState';
import { useSetRecoilState } from 'recoil';

const App = () => {
	//임시 저장할 guideBoxProps 상태 저장 리코일
	const setGuideBoxProps = useSetRecoilState(SelectedLayerGuideBoxPropsState);

	return (
		<Fragment>
			<Icon
				SVG={<SvgPlusCircle />}
				onClickHandler={() => {
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
