import React from 'react';
import { Icon, SvgUndo, SvgRedo } from '../Svg';
import { motion } from 'framer-motion';

export default function UndoRedo(props: { Undo: any; Redo: any }) {
	const [rotationUndo, setRotationUndo] = React.useState(0);
	const [rotationRedo, setRotationRedo] = React.useState(0);

	function rotateUndoHandler() {
		setRotationUndo(rotationUndo - 360);
	}

	function rotateRedoHandler() {
		setRotationRedo(rotationRedo + 360);
	}

	return (
		<React.Fragment>
			<motion.div
				style={{ cursor: 'pointer' }}
				animate={{ rotate: rotationUndo }}
				onClick={rotateUndoHandler}
				transition={{ duration: 0.3 }}
			>
				<Icon
					SVG={<SvgUndo />}
					onClickHandler={() => {
						props.Undo();
					}}
				/>
			</motion.div>
			<motion.div
				style={{ cursor: 'pointer' }}
				animate={{ rotate: rotationRedo }}
				onClick={rotateRedoHandler}
				transition={{ duration: 0.3 }}
			>
				<Icon
					SVG={<SvgRedo />}
					onClickHandler={() => {
						props.Redo();
					}}
				/>
			</motion.div>
		</React.Fragment>
	);
}
