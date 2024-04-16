// playground 전역 변수 선언
declare global {
	interface Window {
		playground: {
			canvas: any;
		};
	}
}

window.playground = {
	canvas: 'not yet',
};

//다른 컴포넌트에서 사용할 custom hook
export const getCanvasValue = () => {
	return window.playground.canvas;
};
