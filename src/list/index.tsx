import * as React from 'react';
import { useRef } from 'react';
import { motion, useCycle, type MotionStyle } from 'framer-motion';
import { useDimensions } from './use-dimensions';
import { MenuToggle } from './MenuToggle';
import { Navigation } from './Navigation';

const styleNav = {
	position: 'absolute',
	top: 0,
	left: 0,
	bottom: 0,
	width: '300px',
	zIndex: 1001,
} as MotionStyle;

const styleBackground = {
	position: 'absolute',
	top: 0,
	left: 0,
	bottom: 0,
	width: '300px',
	background: '#fff',
} as MotionStyle;

const sidebar = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
		transition: {
			type: 'spring',
			stiffness: 20,
			restDelta: 2,
		},
	}),
	closed: {
		clipPath: 'circle(30px at 40px 40px)',
		transition: {
			delay: 0.5,
			type: 'spring',
			stiffness: 400,
			damping: 40,
		},
	},
};

const SideBar = () => {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const containerRef = useRef(null);
	const { height } = useDimensions(containerRef);

	return (
		<motion.nav
			initial={false}
			animate={isOpen ? 'open' : 'closed'}
			custom={height}
			ref={containerRef}
			style={styleNav}
		>
			<motion.div variants={sidebar} style={styleBackground} />
			<Navigation />
			<MenuToggle toggle={() => toggleOpen()} />
		</motion.nav>
	);
};

export default SideBar;