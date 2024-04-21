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
	const TextFieldV2SampleJson = TextFieldV2Sample;
	pySchema = pySchematest;

	function convertSchema(pySchema: any = {}, uiSchema: any = [], parentKey: string = '') {
		for (const key in pySchema) {
			// console.log('key:', key);
			if (
				pySchema[key] === 'object' ||
				key === 'description' ||
				key === 'required' ||
				key === 'color'
			) {
				continue;
			} else if (typeof pySchema[key] === 'object' && pySchema[key] !== null) {
				convertSchema(pySchema[key], uiSchema, key);
			} else {
				const compSchema = insertRealComponent(key, parentKey, pySchema);
				console.log('compSchema:', compSchema);
				if (compSchema) {
					uiSchema.push(compSchema);
					return;
				}
			}
		}
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
			console.log('string', { key: key, value: pySchema[key], parentKey: parentKey });
			ComponentSchema = makeBasicSchema('TextFieldV2', TextFieldV2SampleJson);
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
		ComponentSchema: any,
		width: string,
		height: string,
		parentKey: string,
	) {
		console.log('parentKey:', parentKey);
		console.log('ComponentSchema title:', ComponentSchema.props.title);
		const floatingBoxJson = {
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
			children: [{}],
			parent: null,
		};
		floatingBoxJson.children.push(ComponentSchema);
		return floatingBoxJson;
	}

	convertSchema(pySchema['schema']['parameters'], uiSchema['layers']);
	console.log('uiSchema: ', uiSchema);
	return uiSchema;
}
