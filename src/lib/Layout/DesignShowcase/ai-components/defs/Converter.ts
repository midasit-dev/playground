//uuid
import { v4 as uuidv4 } from 'uuid';
import { TextFieldV2Sample, SwitchSample, ColorPickerSample } from '@midasit-dev/moaui';
import { cloneDeep } from 'lodash';
import { BasicUISchema, ConvertResult } from '../../../../Common/types';
import { dir } from 'console';

function makeBasicSchema(type: string = '', props: any = {}, children: any = []): BasicUISchema {
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
		x: 16,
		y: 0,
		width: '220px',
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
				id: 'Button-Run',
				children: 'Run',
				disabled: false,
				width: '100%',
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
		id: 'color',
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

export default async function Converter(
	pySchema: any = {},
	direction: string = '',
): Promise<ConvertResult> {
	const uiSchema = await require('./uiSchema.json');

	let pyArgumentComponent: { [key: string]: string } = {}; // Explicitly define the type of pyArgumentComponent
	let maxWidth = '220px';
	let maxHeight = '30px';
	let totalWidth = 0;
	let totalHeight = 0;

	function convertSchema(pySchemaParams: any = {}, layers: any = [], parentKey: string = ''): any {
		let result: any = [];

		for (const key in pySchemaParams) {
			if (pySchemaParams[key] === 'object' || key === 'description' || key === 'required') {
				continue;
			} else if (typeof pySchemaParams[key] === 'object' && pySchemaParams[key] !== null) {
				if (key === 'color') {
					const sampleSchema = { ...ColorPickerSchema };
					pyArgumentComponent['color'] = 'ColorPicker';
					if (maxWidth < sampleSchema.props.width) maxWidth = sampleSchema.props.width;
					if (maxHeight < sampleSchema.props.height) maxHeight = sampleSchema.props.height;
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
		let ComponentSchema: BasicUISchema = {
			id: '',
			type: '',
			props: {},
			children: [],
			parent: null,
		};

		if (pySchema[key] === 'string') {
			const sampleCode: { [key: string]: any } = { ...TextFieldV2Sample };
			sampleCode["id"] = parentKey;
			pyArgumentComponent[parentKey] = 'TextFieldV2';
			ComponentSchema = makeBasicSchema('TextFieldV2', sampleCode);
			console.log('ComponentSchema', ComponentSchema);
			if (ComponentSchema.props.width) {
				if (maxWidth < ComponentSchema.props.width) {
					maxWidth = ComponentSchema.props.width;
					width = ComponentSchema.props.width;
					ComponentSchema.props.width = '100%';
				} else {
					width = maxWidth;
					ComponentSchema.props.width = '100%';
				}
			}
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
		totalWidth = totalWidth + Number(removeString(width, 'px')) + 16;
		totalHeight = totalHeight + Number(removeString(height, 'px')) + 16;
		return {
			id: `1-FloatingBox-${uuidv4().slice(0, 8)}`,
			type: 'FloatingBox',
			props: {
				x: 16,
				y: 16,
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
		const layer = cloneDeep(layers);
		let preFloatBoxX = '0';
		let preFloatBoxY = '0';
		let preFloatBoxWidth = '0';
		let preFloatBoxHeight = '0';
		for (let i = 0; i < layer.length; i++) {
			if (i === layers.length - 1) break;
			if (layer[i].type === 'FloatingBox') {
				if (layer[i].props) {
					preFloatBoxX = layer[i].props.x;
					preFloatBoxY = layer[i].props.y;
					preFloatBoxWidth = layer[i].props.width.toString();
					preFloatBoxHeight = layer[i].props.height.toString();
					if (direction === 'rows') {
						preFloatBoxWidth = removeString(preFloatBoxWidth, 'px');
						layer[i + 1].props.x = Number(preFloatBoxWidth) + Number(preFloatBoxX) + 10;
					} else if (direction === 'columns' || direction === '') {
						preFloatBoxHeight = removeString(preFloatBoxHeight, 'px');
						layer[i + 1].props.y = Number(preFloatBoxHeight) + Number(preFloatBoxY) + 10;
					}
				}
			}
		}
		return layer;
	}

	const result = convertSchema(pySchema['schema']['parameters'], uiSchema['layers']);
	uiSchema.layers = [...(result[0] as any[])];
	uiSchema.layers.push({ ...RunButtonSchema });
	uiSchema.layers = floatingBox_readjustXY_byPreFloatingBoxWidthHeight(uiSchema.layers, direction);
	if (direction === 'rows') {
		uiSchema.canvas.height = Number(removeString(maxHeight, 'px')) + 32;
		uiSchema.canvas.width =
			totalWidth + Number(removeString(RunButtonSchema.props.width, 'px')) + 16;
	} else if (direction === 'columns' || direction === '') {
		uiSchema.canvas.height =
			totalHeight + Number(removeString(RunButtonSchema.props.height, 'px')) + 16;
		uiSchema.canvas.width = Number(removeString(maxWidth, 'px')) + 32;
	}
	console.log('uiSchema', uiSchema);
	return { uiSchema: uiSchema, pyArgumentComponent: pyArgumentComponent };
}
