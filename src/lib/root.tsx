import { useEffect } from 'react';
import Layout from './Layout/index';
import { useRecoilState } from 'recoil';
import './output.css';
import { type PlaygroundProps } from './Common/types';
import { CanvasState, LayersState, PythonState } from './Layout/recoilState';

function Root(props: PlaygroundProps) {
	const { schema, onChange } = props;

	const [canvas, setCanvas] = useRecoilState(CanvasState);
	const [layers, setLayers] = useRecoilState(LayersState);
	const [python, setPython] = useRecoilState(PythonState);

	//Impot 영역
	useEffect(() => {
		//만약 schema가 존재한다면, 값을 Setting한다.
		if (schema) {
			if (schema.canvas) setCanvas(schema.canvas);
			if (schema.layers) setLayers(schema.layers);
			if (schema.python) setPython(schema.python);
		}
	}, [schema, setCanvas, setLayers, setPython]);

	//Export 영역
	useEffect(() => {
		//만약 onChange가 존재한다면, 값을 Setting한다.
		if (onChange) onChange({ canvas, layers, python });
	}, [onChange, canvas, layers, python]);

	return <Layout />;
}

export default Root;
