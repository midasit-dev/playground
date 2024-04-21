import { motion } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { PropComponentLayerModifyValueState } from '../../../../recoilState';
import { SvgModify } from '../../Svg';

const App = (props: any) => {
	const { index, layer } = props;

	//Properties to modify 컴포넌트가 활성화 될 수 있도록,
	//수정 버튼 클릭 시, 현재 컴포넌트 데이터를 임시 저장공간에 저장한다.
	//저장 후 연결된 동작에 의해 Properties to modify 컴포넌트가 활성화 된다.
	const setValueToModify = useSetRecoilState(PropComponentLayerModifyValueState);

	return (
		<motion.button
			whileTap={{ scale: 0.97 }}
			whileHover={{
				backgroundColor: 'rgb(55 65 81)',
				color: 'white',
			}}
			onClick={() => setValueToModify(layer)}
			className='w-[270px] h-auto py-2 px-4 rounded-md box-border flex flex-row items-center bg-gray-300 bg-opacity-60 text-gray-700 text-xs'
		>
			{`${layer.type}`}
		</motion.button>
	);
};

export default App;
