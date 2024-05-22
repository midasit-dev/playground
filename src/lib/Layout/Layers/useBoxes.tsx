import React from 'react';
import InnerLayer from './Canvas/InnerLayer';
import { ControllerInputs } from '../../Common/types';
import { useRecoilState } from 'recoil';
import { LayerRenderingBoxesState, LayersState, UndoRedoLayerState } from '../recoilState';
import { v4 as uuid4 } from 'uuid';
import { canvas_snap_criteria } from '../../Common/const';
import { cloneDeep } from 'lodash';

interface useBoxesProps {
	initializeInputs: any;
}

export const useBoxes = (props: useBoxesProps) => {
	const [boxes, setBoxes] = useRecoilState(LayerRenderingBoxesState);
	const [undoRedo, setUndoRedo] = useRecoilState(UndoRedoLayerState);
	const [layers, setLayers] = useRecoilState(LayersState);

	const { initializeInputs } = props;

	const handleClickDelete = React.useCallback(
		(id: string) => {
			setUndoRedo((prev: any) => ({ undo: [...prev.undo, layers], redo: [] }));
			setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== id));
			setLayers((prevLayers) => prevLayers.filter((layer) => layer.id !== id));
		},
		[layers],
	);

	const handleClickPrevDelete = React.useCallback(() => {
		let prevId = '';
		if (boxes.length > 0) {
			const temp = boxes.map((box) => box.id);
			prevId = temp.pop() || '';
			setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== prevId));
		}
		handleClickDelete(prevId);
	}, [boxes, handleClickDelete]);

	const handleClickDelAllBoxes = React.useCallback(() => {
		setUndoRedo((prev: any) => ({ undo: [...prev.undo, layers], redo: [] }));
		setBoxes([]);
		setLayers([]);
		initializeInputs();
	}, [initializeInputs, layers]);

	const createNewBox = React.useCallback(
		(id: string, inputs: ControllerInputs) => {
			//내부 스냅값을 설정한다.
			const snapCriteria = canvas_snap_criteria;

			return {
				id: id,
				element: (
					<InnerLayer
						key={id}
						id={id}
						defaultX={inputs.x}
						defaultY={inputs.y}
						defaultWidth={inputs.width}
						defaultHeight={inputs.height}
						bounds='.wrapper-box'
						dragGrid={[snapCriteria, snapCriteria]}
						resizeGrid={[snapCriteria, snapCriteria]}
						spacing={0}
						onDelete={handleClickDelete}
						onSendStyleToController={initializeInputs}
					/>
				),
			};
		},
		[handleClickDelete, initializeInputs, canvas_snap_criteria],
	);

	const handleClickAddBox = React.useCallback(
		(
			type: 'default' | 'left' | 'right' | 'top' | 'bottom' = 'default',
			inputs: ControllerInputs,
		) => {
			console.log('useBoxes handleClickAddBox');
			//생성 시점 UUID 기록
			const addUUID = uuid4().slice(0, 8);
			const newId = `${boxes.length + 1}-FloatingBox-${addUUID}`; //id 생성

			let modifiedX = inputs.x;
			if (boxes.length > 0) {
				if (type === 'left') modifiedX -= inputs.width + inputs.spacing;
				if (type === 'right') modifiedX += inputs.width + inputs.spacing;
			}

			let modifiedY = inputs.y;
			if (boxes.length > 0) {
				if (type === 'top') modifiedY -= inputs.height + inputs.spacing;
				if (type === 'bottom') modifiedY += inputs.height + inputs.spacing;
			}

			const newInputs = {
				x: modifiedX,
				y: modifiedY,
				width: inputs.width,
				height: inputs.height,
				spacing: inputs.spacing,
			};

			//input 최신화
			initializeInputs(newInputs);

			// 이전 상태 저장
			console.log('useBoxes handleClickAddBox setUndoRedo');
			setUndoRedo((prev: any) => ({ undo: [...prev.undo, layers], redo: [] }));

			//새로운 box 생성
			const newBox = createNewBox(newId, newInputs);
			console.log('useBoxes handleClickAddBox setBoxes');
			setBoxes((prevBoxes) => [...prevBoxes, newBox]);

			console.log('useBoxes handleClickAddBox setLayers');
			setLayers((prevBoxSchemas) => [
				...prevBoxSchemas,
				{
					id: newId,
					type: 'FloatingBox',
					props: {
						x: modifiedX,
						y: modifiedY,
						width: inputs.width,
						height: inputs.height,
						guideBoxProps: {
							width: 'inherit',
							height: 'inherit',
						},
					},
					children: [],
				},
			]);
		},
		[boxes.length, createNewBox, initializeInputs, layers],
	);

	const UndoLayoutState = React.useCallback(() => {
		// Undo
		if (undoRedo.undo === null || undoRedo.undo.length === 0) return;
		const prevLayers = undoRedo.undo[undoRedo.undo.length - 1];
		setLayers(prevLayers);
		setUndoRedo((prev: any) => {
			return {
				undo: prev.undo.slice(0, prev.undo.length - 1),
				redo: [...prev.redo, layers],
			};
		});
	}, [undoRedo.undo, undoRedo.redo, layers]);

	const RedoLayoutState = React.useCallback(() => {
		// Redo
		if (undoRedo.redo === null || undoRedo.redo.length === 0) return;
		const prevLayers = cloneDeep(undoRedo.redo[undoRedo.redo.length - 1]);
		setLayers(prevLayers);
		setUndoRedo((prev: any) => {
			return {
				undo: [...prev.undo, layers],
				redo: prev.redo.slice(0, prev.redo.length - 1),
			};
		});
	}, [undoRedo.undo, undoRedo.redo, layers]);

	React.useEffect(() => {
		console.log('use undoRedo', undoRedo.undo);
	}, [undoRedo]);

	React.useEffect(() => {
		console.log('use layers', layers);
	}, [layers]);

	React.useEffect(() => {
		console.log('use boxes', boxes);
	}, [boxes]);

	return {
		handleClickDelete,
		handleClickPrevDelete,
		handleClickDelAllBoxes,
		handleClickAddBox,
		createNewBox,
		UndoLayoutState,
		RedoLayoutState,
	};
};
