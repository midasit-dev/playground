import { useEffect, useState } from 'react';
import { Icon, SvgTag } from '../Svg';
import { motion } from 'framer-motion';
import { zindex_dockbar_more } from '../../../../Common/zindex';
import { useRecoilValue } from 'recoil';
import { LayersState } from '../../../recoilState';
import { Layer } from '../../../../Common/types';

const App = () => {
	const [isOn, setIsOn] = useState(false);
	const layers = useRecoilValue(LayersState);

	const [isEnable, setIsEnable] = useState(false);
	useEffect(() => {
		layers && layers.length > 0 ? setIsEnable(true) : setIsEnable(false);
	}, [layers]);

	return (
		<div>
			<Icon SVG={<SvgTag />} onClickHandler={() => setIsOn(!isOn)} isEnable={isEnable} />
			<motion.div
				className='w-auto min-w-80 h-auto py-6 px-6 rounded-md shadow-lg box-border justify-center border border-[#e5e7e8] opacity-80 flex flex-col space-y-1 bg-white bg-opacity-80'
				animate={{
					opacity: isOn ? 1 : 0,
					display: isOn ? 'flex' : 'none',
					position: 'absolute',
					bottom: isOn ? 80 : 50,
					right: 0,
					pointerEvents: isOn ? 'auto' : 'none',
					zIndex: isOn ? zindex_dockbar_more : -1,
				}}
			>
				{layers && layers.length > 0 && (
					layers.map((layer: Layer, index: number) => {
						return (
							<div key={index}>
								{layer.children && layer.children.length > 0 ? (
									layer.children.map((child: any) => child.props.id !== '' ? <p className='text-xs'># {child.props.id}</p> : null)
								) : (
									<p className='text-xs w-full text-center'>create childrens with 'id'</p>
								)}
							</div>
						);
					})
				)}
			</motion.div>
		</div>
	);
};

export default App;
