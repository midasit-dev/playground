import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { SelectedLayerIdState } from '../recoilState';
import Moaui, { type FloatingBoxProps, FloatingBox } from '@midasit-dev/moaui';
import { type Layer } from '../../Common/types';
import '../SelectedLayer.css';
import { isAvailableComp } from './AvailableComponents';

const ToFloatingBox = (props: { layer: Layer }) => {
	const { layer } = props;

	const [fill, setFill] = useState('1');
	const [opacity, setOpacity] = useState(1);
	const [border, setBorder] = useState('none');

	const [selectedLayerId, setSelectedLayerId] = useRecoilState(SelectedLayerIdState);

	useEffect(() => {
		layer.id === selectedLayerId ? setFill('rgba(75, 154, 244, .7)') : setFill('1');
	}, [layer.id, selectedLayerId]);

	const innnerProps: FloatingBoxProps = {
		key: layer.id,
		...layer.props,
		show: true,
		fill: fill,
		opacity: opacity,
		cursor: 'pointer',
		transition: 'opacity 0.4s ease',
		border: border,
		onMouseOver: () => {
			setOpacity(0.7);
			setBorder('1px solid #b3b3b7');
		},
		onMouseLeave: () => {
			setOpacity(1);
			setBorder('none');
		},
		onMouseDown: () =>
			layer.id === selectedLayerId ? setFill('rgba(75, 154, 244, 1)') : setFill('2'),
		onMouseUp: () =>
			layer.id === selectedLayerId ? setFill('rgba(75, 154, 244, .7)') : setFill('1'),
		onClick: () => {
			if (layer.id !== selectedLayerId) {
				//처음으로 누른 경우 (선택)
				setSelectedLayerId(layer.id);
			} else {
				//이미 눌린 상태인데 한번 더 누른 경우 (해제)
				// setSelectedLayerId(null);
			}
		},
	};

	return (
		<FloatingBox {...innnerProps}>
			{layer.children &&
				layer.children.map((child: Layer, index: number) => {
					return <ToComponent key={index} layer={child} />;
				})}
		</FloatingBox>
	);
};

const ToComponentReal = <T extends React.ComponentType<any>>(props: {
	layer: Layer;
	component: T;
}) => {
	const { layer, component: Component } = props;
	return <Component {...JSON.parse(JSON.stringify(layer.props))} />;
};

const ToComponent = (props: { layer: Layer }) => {
	const { layer } = props;

	if (layer.type === 'FloatingBox') {
		return <ToFloatingBox layer={layer} />;
	} else if (isAvailableComp(layer.type)) {
		return <ToComponentReal layer={layer} component={Moaui[layer.type]} />;
	} else {
		console.error('Unknown Layer Type:', layer.type);
		return null;
	}
};

export default ToComponent;
