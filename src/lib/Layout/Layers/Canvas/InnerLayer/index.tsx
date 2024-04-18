import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { type Layer, type Layers } from '../../../../Common/types';
import { useRecoilState } from 'recoil';
import { LayersState } from '../../../recoilState';
import { Icon, SvgClose } from './Svg';

export interface RndBoxProps {
	key: string;
	id: string;
	defaultX: number;
	defaultY: number;
	defaultWidth: number;
	defaultHeight: number;
	dragGrid?: [number, number];
	bounds?: string;
	resizeGrid?: [number, number];
	children?: React.ReactNode;
	spacing: number;

	//Buttons
	onDelete?: any;
	onSendStyleToController?: (inputs: any) => void;
}

const App = (props: RndBoxProps) => {
	const { id, children, onDelete } = props;

	const [layers, setLayers] = useRecoilState(LayersState);

	const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation();
	const onMouseDownHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation();

	const [width, setWidth] = useState(props.defaultWidth);
	const [height, setHeight] = useState(props.defaultHeight);
	const [x, setX] = useState(props.defaultX);
	const [y, setY] = useState(props.defaultY);

	const handleResizeStop = (e: any, direction: any, ref: any, delta: any, position: any) => {
		const _x = parseInt(position.x);
		const _y = parseInt(position.y);
		setX(_x);
		setY(_y);

		const _width = parseInt(ref.style.width);
		const _height = parseInt(ref.style.height);
		setWidth(_width);
		setHeight(_height);

		onUpdateLayer(_x, _y, _width, _height);
	};

	const handleDragStop = (e: any, d: any) => {
		const _x = parseInt(d.x);
		const _y = parseInt(d.y);
		setX(_x);
		setY(_y);

		onUpdateLayer(_x, _y, width, height);
	};

	const onUpdateLayer = (x: number, y: number, width: number, height: number) => {
		if (setLayers) {
			setLayers((prev: any) => {
				const newBoxlayers = prev.map((box: any) => {
					if (box.id === id) {
						return {
							...box,
							props: { ...box.props, x, y, width, height },
						};
					}
					return box;
				});
				return newBoxlayers;
			});

			setUpdateLayer4Parent && setUpdateLayer4Parent(true);
		}
	};

	// add parent key to box layers
	const [updateLayer4Parent, setUpdateLayer4Parent] = useState(false);
	React.useEffect(() => {
		if (!updateLayer4Parent) return;

		const findParent = (curLayer: Layer | undefined, layers: Layers | undefined): string | null => {
			if (!curLayer || !curLayer.props) return null;
			if (!layers) return null;

			const parents: Layers = [];
			for (const layer of layers) {
				if (!layer.props) continue;

				if (
					curLayer.props.x >= layer.props.x &&
					curLayer.props.y >= layer.props.y &&
					curLayer.props.x + curLayer.props.width <= layer.props.x + layer.props.width &&
					curLayer.props.y + curLayer.props.height <= layer.props.y + layer.props.height
				) {
					if (curLayer.id === layer.id) continue;
					parents.push(layer);
				}
			}
			parents.sort((a, b) => {
				if (!a.props || !b.props) return 0;
				return a.props.x - b.props.x;
			});
			return parents.length > 0 ? parents[parents.length - 1].id : null;
		};

		const addParentId = (layers: Layers): Layers => {
			return layers.map((layer) => {
				const parentId = findParent(layer, layers) || null;
				return { ...layer, parent: layer.id === parentId ? undefined : parentId };
			});
		};

		const temp = addParentId(layers);
		setLayers(temp);

		setUpdateLayer4Parent(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateLayer4Parent]);

	//해당 컴포넌트 생성 시 parent 구조 추가
	React.useEffect(() => {
		setUpdateLayer4Parent(true);
	}, []);

	return (
		<div 
			key={id} 
			id={id} 
			onClick={onClickHandler} 
			onMouseDown={onMouseDownHandler}
		>
			<Rnd
				className='flex items-center justify-center bg-pg-blue-medium bg-opacity-40 border border-pg-blue-medium'
				default={{
					x: props.defaultX,
					y: props.defaultY,
					width: props.defaultWidth,
					height: props.defaultHeight,
				}}
				bounds={props.bounds}
				dragGrid={props.dragGrid}
				resizeGrid={props.resizeGrid}
				onResizeStop={handleResizeStop}
				onDragStop={handleDragStop}
			>
				<div className='absolute w-[20px] h-[20px] top-1/2 left-1/2 -mt-[10px] -ml-[10px]'>
					{onDelete && <Icon SVG={<SvgClose />} onClickHandler={() => onDelete(id)} />}
				</div>
				{children}
			</Rnd>
		</div>
	);
};

export default App;