import * as React from "react";
import { type MotionStyle, motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const styleUl = {
	margin: 0,
	padding: '25px',
  position: 'absolute',
  top: '100px',
  width: '230px',
} as MotionStyle;

export const Navigation = () => (
  <motion.ul 
		variants={variants}
		style={styleUl}
	>
    {itemIds.map(i => (
      <MenuItem i={i} key={i} />
    ))}
  </motion.ul>
);

const itemIds = [0, 1, 2, 3, 4];
