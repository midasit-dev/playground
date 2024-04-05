import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Layer } from '../../Common/types';
import Moaui, {
	type CustomUnionType,
	TextFieldV2,
	TextField,
	Switch,
	Typography,
	GuideBox,
	DropList,
} from '@midasit-dev/moaui';
import {
	PropComponentLayerAddValueState,
	PropComponentLayerModifyValueState,
} from '../recoilState';
import ToPropComponentArray from './ToPropComponentsArray';

export interface PropComponentProps<T> {
	type: string;
	name: string;
	value: T;
	hookType: 'Add' | 'Modify';
}

export const usePropComponent = (type: string, name: string, value: any, hookType: string) => {
	const [localValue, setLocalValue] = useState(value);
	useEffect(() => setLocalValue(value), [value]);

	const [, setAddValue] = useRecoilState(PropComponentLayerAddValueState);
	const [, setModifyValue] = useRecoilState(PropComponentLayerModifyValueState);

	let setValue: any = null;
	if (hookType === 'Add') setValue = setAddValue;
	else if (hookType === 'Modify') setValue = setModifyValue;
	else console.error('hookType is not valid');

	//변경 될 때 마다 Add State에 추가해둠.
	useEffect(() => {
		setValue((prev: Layer) => ({
			...prev,
			props: {
				...prev.props,
				[name]: value,
			},
		}));
	}, [setValue, type, name, value]);

	return {
		localValue,
		setLocalValue,
		updateGlobalValue: setValue,
	};
};

const ToPropComponentUnion = (props: PropComponentProps<CustomUnionType>): JSX.Element => {
	const { type, name, value, hookType } = props;
	const { localValue, setLocalValue, updateGlobalValue } = usePropComponent(
		type,
		name,
		value.defaultValue,
		hookType,
	);
	return (
		<GuideBox width='100%' row horSpaceBetween verCenter>
			<Typography variant='body1'>{name}</Typography>
			<DropList
				itemList={value.values.map((value: string) => [value, value])}
				defaultValue={localValue}
				value={localValue}
				onChange={(e: any) => {
					setLocalValue(String(e.target.value));
					updateGlobalValue((prev: any) => ({
						...prev,
						props: {
							...prev.props,
							[name]: String(e.target.value),
						},
					}));
				}}
				width='100px'
			/>
		</GuideBox>
	);
};

const ToPropComponentMap = (props: PropComponentProps<Map<any, any>>): JSX.Element => {
	//추가하는 것 부터 조금 고민이 필요해보인다 =_=
	const { name, value } = props;
	// const callbackValue = useCallback(() => value, [value]);
	// const { localValue, } = usePropComponent(type, name, callbackValue);
	return (
		<GuideBox width='100%' row horSpaceBetween verCenter opacity={0.5}>
			<Typography variant='body1'>*Map {name}</Typography>
			<TextField width='100px' value={value.toString()} disabled />
		</GuideBox>
	);
};

const ToPropComponentFunction = (props: PropComponentProps<Function>): JSX.Element => {
	//추가하는 것 부터 조금 고민이 필요해보인다 =_=
	const { name, value } = props;
	// const { localValue, } = usePropComponent(type, name, value, hookType);
	return (
		<GuideBox width='100%' row horSpaceBetween verCenter opacity={0.5}>
			<Typography variant='body1'>{name}</Typography>
			<TextField width='100px' value={value.toString()} disabled />
		</GuideBox>
	);
};

const ToPropComponentNumber = (props: PropComponentProps<number>): JSX.Element => {
	const { type, name, value, hookType } = props;
	const { localValue, setLocalValue, updateGlobalValue } = usePropComponent(
		type,
		name,
		value,
		hookType,
	);
	return (
		<GuideBox width='100%' row horSpaceBetween verCenter>
			<Typography variant='body1'>{name}</Typography>
			<TextFieldV2
				type='number'
				numberOptions={{
					onlyInteger: true,
					min: 0,
					step: 1,
				}}
				width='100px'
				value={localValue.toString()}
				titlePosition='left'
				onChange={(event) => {
					setLocalValue(Number(event.target.value));
					updateGlobalValue((prev: any) => ({
						...prev,
						props: {
							...prev.props,
							[name]: Number(event.target.value),
						},
					}));
				}}
			/>
		</GuideBox>
	);
};

const ToPropComponentString = (props: PropComponentProps<string>): JSX.Element => {
	const { type, name, value, hookType } = props;
	const { localValue, setLocalValue, updateGlobalValue } = usePropComponent(
		type,
		name,
		value,
		hookType,
	);

	return (
		<GuideBox width='100%' row horSpaceBetween verCenter>
			<Typography variant='body1'>{name}</Typography>
			<TextField
				width='100px'
				value={localValue}
				titlePosition='left'
				onChange={(event) => {
					setLocalValue(event.target.value);
					updateGlobalValue((prev: any) => ({
						...prev,
						props: {
							...prev.props,
							[name]: event.target.value,
						},
					}));
				}}
			/>
		</GuideBox>
	);
};

const ToPropComponentBoolean = (props: PropComponentProps<boolean>): JSX.Element => {
	const { type, name, value, hookType } = props;
	const { localValue, setLocalValue, updateGlobalValue } = usePropComponent(
		type,
		name,
		value,
		hookType,
	);
	return (
		<GuideBox width='100%' row horSpaceBetween verCenter>
			<Typography variant='body1'>{name}</Typography>
			<Switch
				checked={localValue}
				onChange={(event) => {
					setLocalValue(event.target.checked);
					updateGlobalValue((prev: any) => ({
						...prev,
						props: {
							...prev.props,
							[name]: event.target.checked,
						},
					}));
				}}
			/>
		</GuideBox>
	);
};

const ToPropComponentObject = (props: PropComponentProps<object>): JSX.Element => {
	const { name, value } = props;
	// const { localValue, } = usePropComponent(type, name, value, hookType);
	return (
		<GuideBox width='100%' row horSpaceBetween verCenter opacity={0.5}>
			<Typography variant='body1'>*object {name}</Typography>
			<TextField width='100px' value={JSON.stringify(value)} disabled />
		</GuideBox>
	);
};

const ToPropComponentDefault = (props: PropComponentProps<any>): JSX.Element => {
	const { name, value } = props;
	return (
		<GuideBox width='100%' row horSpaceBetween verCenter opacity={0.5}>
			<Typography variant='body1'>*default {name}</Typography>
			<TextField width='100px' value={JSON.stringify(value)} disabled />
		</GuideBox>
	);
};

const ToPropComponent = (props: PropComponentProps<any>): JSX.Element => {
	const { type, name, value, hookType } = props;

	//function등과 같이 아직 global 데이터를 업데이트하지 않는 변수들은 이곳에 들어올 수 있다.
	if (value === undefined) return <></>;

	if ((value as CustomUnionType).isUnion) {
		return <ToPropComponentUnion type={type} name={name} value={value} hookType={hookType} />;
	} else if (value instanceof Array) {
		return <ToPropComponentArray type={type} name={name} value={value} hookType={hookType} />;
	} else if (value instanceof Map) {
		return <ToPropComponentMap type={type} name={name} value={value} hookType={hookType} />;
	} else {
		//원시 타입
		switch (typeof value) {
			case 'function':
				return (
					<ToPropComponentFunction type={type} name={name} value={value} hookType={hookType} />
				);
			case 'string':
				return <ToPropComponentString type={type} name={name} value={value} hookType={hookType} />;
			case 'boolean':
				return <ToPropComponentBoolean type={type} name={name} value={value} hookType={hookType} />;
			case 'number':
				return <ToPropComponentNumber type={type} name={name} value={value} hookType={hookType} />;
			case 'object':
				return <ToPropComponentObject type={type} name={name} value={value} hookType={hookType} />;
			default:
				return <ToPropComponentDefault type={type} name={name} value={value} hookType={hookType} />;
		}
	}
};

interface ToPropComponentsProps {
	componentType: string;
	customProps?: any;
	customHookType: PropComponentProps<any>['hookType'];
}

const ToPropComponents = (props: ToPropComponentsProps): JSX.Element => {
	const { componentType, customProps, customHookType } = props;

	const [options, setOptions] = useState<any[][]>([]);
	useEffect(() => {
		//TODO 임시
		if (componentType === 'Button') {
			if (customProps) {
				//Mod 대화상자 오픈 시 사용
				//라이브러리 Property에서 Union Type인지 검사 한 후,
				//Union Type이면 defaultValue에 customProps에서 넘어온 값을 채워준다.
				let modCustomProps = { ...customProps };
				for (const [key, value] of Array.from(Object.entries(TempProps))) {
					if ((value as CustomUnionType).isUnion) {
						const unionValue = value as CustomUnionType;
						unionValue.defaultValue = customProps[key];
						modCustomProps[key] = unionValue;
					}
				}

				const sortedKeys = Object.keys(TempProps);
				const modSortedCustomPropsArray = sortedKeys.map((key: string) => [
					key,
					modCustomProps[key],
				]);
				setOptions(modSortedCustomPropsArray);
			} else {
				//Add 대화상자 오픈 시 사용
				const playgroundProps = TempProps;
				setOptions(Array.from(Object.entries(playgroundProps)));
			}
		} else {
			// //지금은 아래 컴포넌트들만 sampleProps을 가지고 있음.
			// //추후에 다른 컴포넌트들도 추가되면 아래 case 분기가 필요 없어짐.
			// const enableSamplePropComp: EnableSamplePropComponent = componentType as EnableSamplePropComponent;
			// if (!enableSamplePropComp) return;
			// if (customProps) setOptions(customProps);
			// else setOptions(Moaui[enableSamplePropComp].sampleProps);
		}
	}, [customProps, componentType]);

	return (
		<GuideBox width='100%' horSpaceBetween verCenter spacing={0.5}>
			{/* {Object.entries(options).map(([name, value], index: number) => {
				console.log(index, componentType, name, value, customHookType);
				return <ToPropComponent key={index} type={componentType} name={name} value={value} hookType={customHookType} />;
			})} */}
			{options.map(([name, value], index: number) => {
				console.log(index, name, value);
				return (
					<ToPropComponent
						key={index}
						type={componentType}
						name={name}
						value={value}
						hookType={customHookType}
					/>
				);
			})}
		</GuideBox>
	);
};

export default ToPropComponents;

// //TODO 임시
// export type EnableSamplePropComponent =
// 	'Button'
// 	| 'Panel'
// 	| 'DropList'
// 	| 'TextField'
// 	| 'TextFieldV2'
// 	| 'Alert'
//추가되면 여기에;

//TODO 임시
const toUnionType = (props: Partial<CustomUnionType>): CustomUnionType => {
	const { values, defaultValue } = props;
	return {
		isUnion: true,
		values: values || [],
		defaultValue: defaultValue || values?.[0] || null,
	};
};

export const TempProps = {
	children: 'Button',
	onClick: () => {},
	variant: toUnionType({ values: ['contained', 'outlined', 'text'] }),
	disabled: false,
	width: '100px',
	color: toUnionType({ values: ['normal', 'negative'] }),
	loading: false,
};
