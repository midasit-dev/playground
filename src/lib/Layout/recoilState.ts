import { ControllerInputs, type Layers, type Layer, type Box, Canvas } from '../Common/types';
import { atom, selector } from 'recoil';
import { type Props as RndProps } from 'react-rnd';
import { type GuideBoxProps } from '@midasit-dev/moaui';
import { IQueryKey } from './DesignShowcase/ai-components/defs/Interface';

export const LayersMenuState = atom<{
	canvas: RndProps;
	controller: RndProps;
	json: RndProps;
}>({
	key: 'LayersMenuState',
	default: {
		canvas: {
			default: { x: -300, y: 0, width: 300, height: 0 },
			enableResizing: false,
		},
		controller: {
			default: { x: -300, y: 172 + 16, width: 300, height: 0 },
			enableResizing: false,
		},
		json: {
			default: { x: -300, y: 172 + 16 + 394 + 16, width: 300, height: 0 },
			enableResizing: false,
		},
	},
});

export const CanvasState = atom<Canvas>({
	key: 'CanvasState',
	default: { width: 640, height: 640 },
});

export const defaultControllerState = {
	x: 0,
	y: 0,
	width: 160,
	height: 48,
	spacing: 0,
};

export const ControllerState = atom<ControllerInputs>({
	key: 'ControllerState',
	default: defaultControllerState,
});

export const LayerRenderingBoxesState = atom<Box[]>({
	key: 'LayerRenderingBoxesState',
	default: [],
});

export const LayersState = atom<Layers>({
	key: 'LayersState',
	default: [],
});

export const ComponentizedRenderingBoxesState = atom<Box[]>({
	key: 'ComponentizedRenderingBoxesState',
	default: [],
});

export const SelectedLayerIdState = atom<string | null>({
	key: 'SelectedLayerIdState',
	default: null,
});

//Selected LayerId에 따라서 Opacity를 조절하기 위한 State
export const OpacityBySelectedLayerIdState = selector<number>({
	key: 'OpacityBySelectedLayerIdState',
	get: ({ get }) => {
		const selectedLayerId = get(SelectedLayerIdState);
		if (selectedLayerId === null) return 0.3;
		return 1;
	},
});

//Selected LayerId가 변경되면 해당 Id를 가진 Layer를 반환하는 State
export const SelectedLayerState = selector<Layer | null>({
	key: 'SelectedLayerState',
	get: ({ get }) => {
		const selectedLayerId = get(SelectedLayerIdState);
		const layers = get(LayersState);
		if (selectedLayerId === null) return null;
		return layers.find((layer: any) => layer.id === selectedLayerId) || null;
	},
});

//Selected Layer의 GuideBoxProps State
export const SelectedLayerGuideBoxPropsState = atom<GuideBoxProps | null>({
	key: 'SelectedLayerGuideBoxPropsState',
	default: {},
});

export const defaultLayerProps = {
	id: '',
	type: '',
	props: {},
	children: [],
};

export const PropComponentLayerAddValueState = atom<Layer>({
	key: 'PropComponentLayerAddValueState',
	default: defaultLayerProps,
});

export const PropComponentLayerModifyValueState = atom<Layer | null>({
	key: 'PropComponentLayerModifyValueState',
	default: null,
});

export const SelectedModifyComponentPropsState = atom<Layer | null>({
	key: 'SelectedModifyComponentPropsState',
	default: null,
});

export const ShowCaseBoxState = atom<any>({
	key: 'ShowCaseBoxState',
	default: {
		x: 0,
		y: 0,
	},
});

export const GuideLayerVisibleState = atom<boolean>({
	key: 'GuideLayerVisibleState',
	default: false,
});

export const ShowcaseCanvasLockState = atom<boolean>({
	key: 'ShowcaseCanvasLockState',
	default: true,
});

export const CanvasMarginState = atom<any>({
	key: 'CanvasMarginState',
	default: {
		marginTop: 0,
	},
});

export const SelectedAddComponentKey = atom<string>({
	key: 'SelectedAddComponentKey',
	default: 'Alert',
});

export const PythonState = atom<string>({
	key: 'PythonState',
	default: '',
});

export const AIQuery = atom<IQueryKey>({
	key: 'AIQuery',
	default: undefined,
});
