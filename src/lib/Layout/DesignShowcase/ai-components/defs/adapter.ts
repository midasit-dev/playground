import { ISelectionData, IQueryKey } from './Interface';
import { v4 as uuidv4 } from 'uuid';

export const functionListAdapter = async (value: IQueryKey) => {
	// const _body = require("./Schema.json");
	if (value === undefined) return {};

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
	let mockData: ISelectionData = {};
	try {
		mockData = JSON.parse(data.body);
	} catch {}

	return mockData;
};
