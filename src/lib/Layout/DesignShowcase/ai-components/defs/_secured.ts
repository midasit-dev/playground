const authApiEndpoint: string = 'https://api-agw-backend.midasuser.com/auth/v1/login';
const userIdentifier: string = JSON.stringify({
	email: 'midas_official@midasit.com',
	password: 'q1w2e3r4t5',
});
const getAiResponse = (value: string) =>
	`https://moa.rpm.kr-dv-midasit.com/backend/gpt/function-knowledges/${value}/similar-functions`;
const getAiSchemaCode = (threadId: string | number, functionId: string | number) =>
	`https://moa.rpm.kr-dv-midasit.com/backend/gpt/function-knowledges/${String(
		threadId,
	)}/functions/${String(functionId)}`;

export { authApiEndpoint, userIdentifier, getAiResponse, getAiSchemaCode };
