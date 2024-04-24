import ColorfulCircularProgress from './ColorfulCircularProgress';

export default function InfiniLoading(props: { x: number; y: number }) {
	return (
		<div
			style={{
				position: 'fixed',
				top: props.y,
				left: props.x,
				width: '100%',
				height: '100%',
				zIndex: 2000,
			}}
		>
			<ColorfulCircularProgress speed={1} />
		</div>
	);
}
