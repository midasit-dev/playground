import { useEffect } from 'react';
import Layout from './Layout/index';
import { useRecoilState } from 'recoil';
import './output.css';
import { Canvas, Layers } from './Common/types';
import { CanvasState, LayersState, PythonState } from './Layout/recoilState';

// declare global {
// 	interface Window {
// 		playground: {
// 			canvas: any;
// 			layers: any;
// 		};
// 	}
// }

export interface Schema {
	canvas: Canvas;
	layers: Layers;
	python: string;
}

export interface PlaygroundProps {
	schema?: Schema;
	onChange?: (schema: Schema) => void;
}

function Root(props: PlaygroundProps) {
	const { schema, onChange } = props;

	const [canvas, setCanvas] = useRecoilState(CanvasState);
	const [layers, setLayers] = useRecoilState(LayersState);
	const [python, setPython] = useRecoilState(PythonState);

	//Impot 영역
	useEffect(() => {
		//만약 schema가 존재한다면, 값을 Setting한다.
		if (schema) {
			setCanvas(schema.canvas);
			setLayers(schema.layers);
			setPython(schema.python);
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
