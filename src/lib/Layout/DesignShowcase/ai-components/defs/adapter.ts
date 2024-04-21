import { ISelectionData, IQueryKey } from './Interface';
import { v4 as uuidv4 } from 'uuid';
import * as _secured from './_secured';

export const functionListAdapter = async (value: IQueryKey) => {
	const _body = await require('./pySchema.json');

	const isMock = Boolean(
		_secured?.authApiEndpoint === undefined || _secured.authApiEndpoint === '',
	);

	//id: 01HVK86H606EGJ2SC8VXSV9AGJ
	const threadId: string = '01HVTCTVKFPNEJS5Q0DYTREAXB';
	const aiApiEndpoint: string = _secured.getAiResponse(threadId);
	const authApiEndpoint: string = _secured.authApiEndpoint;
	const userIdentifier: string = _secured.userIdentifier;

	if (value === undefined) return {};

	let mockData: ISelectionData = {};
	if (isMock) {
		// Simulate a network request
		const result = await fetch('https://mocktarget.apigee.net/echo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				functionList: [
					{ functionId: uuidv4(), functionName: `mock data 1\n${value}`, similarityScore: 0.87 },
					{ functionId: uuidv4(), functionName: `mock data 2\n${value}`, similarityScore: 0.85 },
					{ functionId: uuidv4(), functionName: `mock data 3\n${value}`, similarityScore: 0.8 },
				],
			}),
		});
		const data: any = await result.json();

		// Parse the response, this is a mock data.
		try {
			mockData = JSON.parse(data.body);
		} catch {}

		return mockData;
	} else {
		const authFetcher = await fetch(authApiEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: userIdentifier,
		});

		if (!authFetcher.ok) return {};
		const authData: any = await authFetcher.json();

		const aiResult = await fetch(aiApiEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-AUTH-TOKEN': `${authData.tokenType} ${authData.token}`,
			},
			body: JSON.stringify(_body),
		});

		if (!aiResult.ok) return {};
		const aiData: ISelectionData = await aiResult.json();
		return aiData;
	}
};
