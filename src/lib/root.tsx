import { useEffect } from 'react';
import Layout from './Layout/index';
import { useRecoilState } from 'recoil';
import './output.css';
import { type PlaygroundProps } from './Common/types';
import { CanvasState, LayersState, PythonRawState, PythonSchemaState } from './Layout/recoilState';

function Root(props: PlaygroundProps) {
	const { schema, onChange } = props;

	const [canvas, setCanvas] = useRecoilState(CanvasState);
	const [layers, setLayers] = useRecoilState(LayersState);
	const [pythonRaw, setPythonRaw] = useRecoilState(PythonRawState);
	const [pythonSchema, setPythonSchema] = useRecoilState(PythonSchemaState);

	//Impot 영역
	useEffect(() => {
		// 만약 schema가 존재하고 변경된 경우에만 값을 설정한다.
		if (schema) {
			if (schema.canvas) setCanvas(schema.canvas);
			if (schema.layers) setLayers(schema.layers);
			if (schema.pythonRaw) setPythonRaw(schema.pythonRaw);
			if (schema.pythonSchema) setPythonSchema(schema.pythonSchema);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [schema]);

	//Export 영역
	useEffect(() => {
		//만약 onChange가 존재한다면, 값을 Setting한다.
		if (onChange) onChange({ canvas, layers, pythonRaw, pythonSchema });
	}, [onChange, canvas, layers, pythonRaw, pythonSchema]);

	return <Layout />;
}

export default Root;
