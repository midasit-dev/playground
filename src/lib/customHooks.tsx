// playground 전역 변수 선언
declare global {
	interface Window {
		playground: {
			canvas: any;
			layers: any;
		};
	}
}

window.playground = {
	canvas: 'not yet',
	layers: 'not yet',
};

export const getGlobalValues = () => {};
