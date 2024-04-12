import React from "react";
import { type MotionStyle, motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

const styleLi = { 
	margin: 0, 
	padding: 0,
	listStyle: 'none',
	marginBottom: '20px',
	display: 'flex',
	alignItems: 'center',
	cursor: 'pointer',
} as MotionStyle;

const styleIconPlaceholder = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  flex: '40px 0',
  marginRight: '20px',
} as React.CSSProperties;

const styleTextPlaceholder = {
	borderRadius: '5px',
	width: '200px',
	height: '20px',
	flex: '1',
} as React.CSSProperties;

export const MenuItem = ({ i }) => {
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
			style={styleLi}
    >
      <div style={{
				...styleIconPlaceholder,
				...style,
			}} />
      <div style={{
				...styleTextPlaceholder,
				...style
			}} />
    </motion.li>
  );
};
