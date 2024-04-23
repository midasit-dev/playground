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
		id: `1-${type}-${uuidv4().slice(0, 8)}`,
		type: type,
		props: props,
		children: children,
		parent: null,
	};

	return BasicSchema;
}

const RunButtonSchema = {
	id: `1-FloatingBox-${uuidv4().slice(0, 8)}`,
	type: 'FloatingBox',
	props: {
		x: 0,
		y: 0,
		width: '150px',
		height: '30px',
		guideBoxProps: {
			width: 'inherit',
			height: 'inherit',
			center: true,
		},
	},
	children: [
		{
			id: `1-Button-${uuidv4().slice(0, 8)}`,
			type: 'Button',
			props: {
				children: 'Run',
				disabled: false,
				width: '150px',
				loading: false,
				variant: 'contained',
				color: 'normal',
			},
			children: [],
		},
	],
	parent: null,
};

const ColorPickerSchema = {
	id: `1-ColorPicker-${uuidv4().slice(0, 8)}`,
	type: 'ColorPicker',
	props: {
		showRGB: true,
		direction: 'column',
		width: '220px',
		height: '320px',
	},
	children: [],
	parent: null,
};

function removeString(str: string, remove: string): string {
	return str.replace(remove, '');
}

export default async function Converter(pySchema: any = {}, direction: string = '') {
	const uiSchema = await require('./uiSchema.json');
	let maxWidth = '0';
	let maxHeight = '0';
	
	
	function convertSchema(pySchemaParams: any = {}, layers: any = [], parentKey: string = ''): any {
		let result: any = [];

		for (const key in pySchemaParams) {
			if (pySchemaParams[key] === 'object' || key === 'description' || key === 'required') {
				continue;
			} else if (typeof pySchemaParams[key] === 'object' && pySchemaParams[key] !== null) {
				if (key === 'color') {
					const sampleSchema = { ...ColorPickerSchema };
					let float_colorPicker_Schema = insertFloatingBox(
						sampleSchema,
						sampleSchema.props['width'],
						sampleSchema.props['height'],
					);
					result.push(float_colorPicker_Schema);
				} else result.push(convertSchema(pySchemaParams[key], layers, key));
			} else {
				const compSchema = insertRealComponent(key, parentKey, pySchemaParams);
				if (compSchema) {
					return compSchema;
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
			const sampleCode = { ...TextFieldV2Sample };
			if ('id' in sampleCode) sampleCode.id = parentKey;
			ComponentSchema = makeBasicSchema('TextFieldV2', sampleCode);
			if (ComponentSchema.props.width) width = ComponentSchema.props.width;
			if (ComponentSchema.props.height) height = ComponentSchema.props.height;
			if (ComponentSchema.props.title) ComponentSchema.props.title = parentKey;
			if (ComponentSchema.props.placeholder && pySchema['description'])
				ComponentSchema.props.placeholder = pySchema['description'];

			let float_Comp_Schema = insertFloatingBox(ComponentSchema, width, height, parentKey);

			return float_Comp_Schema;
		}
		return null;
	}

	function insertFloatingBox(
		ComponentSchema: { id: string; type: string; props: any; children: any; parent: any },
		width: string,
		height: string,
		parentKey: string = '',
	) {
		return {
			id: `1-FloatingBox-${uuidv4().slice(0, 8)}`,
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
	
	function floatingBox_readjustXY_byPreFloatingBoxWidthHeight(
		layers: any = [],
		direction: string = 'rows',
	) {
		let preFloatBoxX = '0';
		let preFloatBoxY = '0';
		let preFloatBoxWidth = '0';
		let preFloatBoxHeight = '0';
		for (let i = 0; i < layers.length; i++) {
			if (i === layers.length - 1) break;
			if (layers[i].type === 'FloatingBox') {
				if (layers[i].props) {
					preFloatBoxX = layers[i].props.x;
					preFloatBoxY = layers[i].props.y;
					preFloatBoxWidth = layers[i].props.width.toString();
					preFloatBoxHeight = layers[i].props.height.toString();
	
					if (direction === 'rows') {
						preFloatBoxWidth = removeString(preFloatBoxWidth, 'px');
						layers[i + 1].props.x = Number(preFloatBoxWidth) + Number(preFloatBoxX) + 10;
					} else if (direction === 'columns' || direction === '') {
						preFloatBoxHeight = removeString(preFloatBoxHeight, 'px');
						layers[i + 1].props.y = Number(preFloatBoxHeight) + Number(preFloatBoxY) + 10;
					}
				}
			}
		}
	}

	const result = convertSchema(pySchema['schema']['parameters'], uiSchema['layers']);
	uiSchema.layers = [...(result[0] as any[])];
	uiSchema.layers.push({ ...RunButtonSchema });
	floatingBox_readjustXY_byPreFloatingBoxWidthHeight(uiSchema.layers, direction);
	console.log('uiSchema', uiSchema);
	return uiSchema;
}
