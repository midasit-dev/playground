import { Layer, Layers, type Schema, type ExportLayers } from '../Common/types';
import { v4 as uuidv4 } from 'uuid';

function replaceIds(layers: Layers | undefined, saveUUID: string): Layers {
	function createNewId(id: string) {
		const idArr = id.split('-');
		if (idArr.length === 3) idArr.push(saveUUID);
		if (idArr.length === 4) idArr[3] = saveUUID;
		if (idArr.length !== 3 && idArr.length !== 4) throw new Error('Invalid id Type');
		return idArr.join('-');
	}

	function findAndReplaceId(layer: Layer): Layer {
		return {
			...layer,
			id: createNewId(layer.id),
			children: layer.children ? layer.children.map(findAndReplaceId) : [],
		};
	}

	if (!layers) return [];
	return layers.map((layer) => findAndReplaceId(layer));
}

function transfromSchemaToJSON(schema: Schema): ExportLayers {
	//동일한 id, key일 경우 리렌더링이 되지 않는 문제 해결을 위해
	//id값에 uuid를 붙여준다.
	//저장 시점 UUID 기록
	const saveUUID = uuidv4().slice(0, 8);

	return {
		canvas: schema.canvas,
		layers: replaceIds(schema.layers, saveUUID),
		python: schema.python,
	};
}

export default transfromSchemaToJSON;
