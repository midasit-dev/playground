import { ISelectionData, IQueryKey, IListItem, ISuggest } from './Interface';
import * as mock from './mock';
import * as _secured from './_secured';

const getToken = async () => {
	const authApiEndpoint: string = _secured.authApiEndpoint;
	const userIdentifier: string = _secured.userIdentifier;

	const authFetcher = await fetch(authApiEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: userIdentifier,
	});

	if (!authFetcher.ok) return {};
	const authData: any = await authFetcher.json();
	return `${authData.tokenType} ${authData.token}`;
};

const sleep = async () => {
	await new Promise((resolve) => setTimeout(resolve, 500));
};

export const functionDetailAdapter = async (value: IListItem): Promise<ISuggest> => {
	const isMock = Boolean(
		_secured?.authApiEndpoint === undefined || _secured.authApiEndpoint === '',
	);
	if (value === undefined) throw Error('No value provided');

	const fnId = '01HVK86H606EGJ2SC8VXSV9AGJ';

	let schema: any = { schema: { name: '', parameters: {}, description: '' }, topK: 0 };
	let fn = '';

	if (isMock) {
		// Simulate a network request
		await sleep();
		schema = mock.mockFunctionInfo.schema;
		fn = mock.mockFunctionInfo.function;
	} else {
		const functionResponse = await fetch(
			`${_secured.getAiSchemaCode(fnId, value.functionId)}?functionLanguage=${
				value.functionLanguage
			}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-AUTH-TOKEN': `${await getToken()}`,
				},
			},
		);
		const functionData = await functionResponse.json();

		schema = functionData.schema;
		fn = functionData.function;
	}

	return {
		schema,
		function: fn,
	};
};

export const functionListAdapter = async (value: IQueryKey) => {
	const _body = await require('./pySchema.json');

	const isMock = Boolean(
		_secured?.authApiEndpoint === undefined || _secured.authApiEndpoint === '',
	);

	//id: 01HVK86H606EGJ2SC8VXSV9AGJ
	const fnId: string = '01HVK86H606EGJ2SC8VXSV9AGJ';
	const aiApiEndpoint: string = _secured.getAiResponse(fnId);

	if (value === undefined) return {};

	if (isMock) {
		let mockData: ISelectionData = {};
		await sleep();
		mockData.functionList = mock.mockFunctionList;
		return mockData;
	} else {
		const aiResult = await fetch(aiApiEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-AUTH-TOKEN': `${await getToken()}`,
			},
			body: JSON.stringify(_body),
		});

		if (!aiResult.ok) return {};
		const aiData: ISelectionData = await aiResult.json();
		return aiData;
	}
};
