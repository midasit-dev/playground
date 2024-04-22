//uuid
import { v4 as uuidv4 } from 'uuid';
import { TextFieldV2Sample, SwitchSample, ColorPickerSample } from '@midasit-dev/moaui';

interface Schema {
	id: string;
	type: string;
	props: any;
	children: any;
	parent: any;
}

function makeBasicSchema(type: string = '', props: any = {}, children: any = []): Schema {
	const BasicSchema = {
		id: `1-${type}-${uuidv4()}`,
		type: type,
		props: props,
		children: children,
		parent: null,
	};

	return BasicSchema;
}

function isEmptyObject(obj: object): boolean {
	return Object.keys(obj).length === 0;
}

export default async function Converter(pySchema: any = {}) {
	const uiSchema = await require('./uiSchema.json');
	const pySchematest = await require('./pySchema.json');
	pySchema = {...pySchematest};

	function convertSchema(pySchemaParams: any = {}, layers: any = [], parentKey: string = ''): any {
		let result: any = [];

		for (const key in pySchemaParams) {
			// console.log('key:', key);
			if (
				pySchemaParams[key] === 'object' ||
				key === 'description' ||
				key === 'required' ||
				key === 'color'
			) {
				continue;
			} else if (typeof pySchemaParams[key] === 'object' && pySchemaParams[key] !== null) {
				// convertSchema(pySchemaParams[key], layers, key);
				result.push(convertSchema(pySchemaParams[key], layers, key));
			} else {
				const compSchema = insertRealComponent(key, parentKey, pySchemaParams);
				if (compSchema) {
					// layers.push(compSchema);
					return compSchema;
					// return compSchema?.children?.[0]?.props?.title;
				}
			}
		}
		return result;
	}

	function insertRealComponent(key: string, parentKey: string, pySchema: any) {
		let width = '0';
		let height = '0';
		let ComponentSchema: Schema = {
			id: '',
			type: '',
			props: {},
			children: [],
			parent: null,
		};
		if (pySchema[key] === 'string') {
			const sampleCode = {...TextFieldV2Sample};
			ComponentSchema = makeBasicSchema('TextFieldV2', sampleCode);
			if (ComponentSchema.props.width) width = ComponentSchema.props.width;
			if (ComponentSchema.props.height) height = ComponentSchema.props.height;
			if (ComponentSchema.props.title) ComponentSchema.props.title = parentKey;
			if (ComponentSchema.props.placeholder && pySchema['description'])
				ComponentSchema.props.placeholder = pySchema['description'];

			let float_Comp_Schema = insertFloatingBox(ComponentSchema, width, height, parentKey);
			if (isEmptyObject(float_Comp_Schema.children[0])) {
				float_Comp_Schema.children.splice(0, 1);
			}

			return float_Comp_Schema;
		}
		return null;
	}

	function insertFloatingBox(
		ComponentSchema: { id: string; type: string; props: any; children: any; parent: any },
		width: string,
		height: string,
		parentKey: string,
	) {
		return {
			id: `1-FloatingBox-${uuidv4()}`,
			type: 'FloatingBox',
			props: {
				x: 0,
				y: 0,
				width: width,
				height: height,
				guideBoxProps: {
					width: 'inherit',
					height: 'inherit',
					center: true,
				},
			},
			children: [ComponentSchema],
			parent: null,
		};
	}

	const result = convertSchema(pySchema['schema']['parameters'], uiSchema['layers']);
	uiSchema.layers = result[0];
	console.log('uiSchema', uiSchema);
	return uiSchema;
}
