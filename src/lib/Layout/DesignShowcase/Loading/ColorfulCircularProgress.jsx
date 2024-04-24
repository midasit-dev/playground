
import { useState, useEffect } from 'react';

function Testsample({ style }) {
  return (
    <svg
      width='64'
      height='64'
      viewBox='0 0 64 64'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={style}
    >
      <ellipse
        cx='32'
        cy='32'
        rx='24'
        ry='24'
        stroke='#BFC6CC'
        strokeOpacity='0.25'
        strokeWidth='4'
      />
      <path
        d='M31.838 8.7302C38.0418 8.68664 44.0086 11.1442 48.4257 15.5621C52.8429 19.9801 55.3485 25.9966 55.3915 32.2881'
        stroke='url(#paint0_linear_10004_97915)'
        strokeWidth='5'
        strokeLinecap='round'
      />
      <defs>
        <linearGradient
          id='paint0_linear_10004_97915'
          x1='49.5'
          y1='49'
          x2='13.8907'
          y2='17.0643'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#F2786D' />
          <stop offset='0.166667' stopColor='#F2AA61' stopOpacity='0.9' />
          <stop offset='0.322917' stopColor='#F2E555' stopOpacity='0.8' />
          <stop offset='0.489583' stopColor='#6CD96C' stopOpacity='0.7' />
          <stop offset='0.640625' stopColor='#619DF2' stopOpacity='0.6' />
          <stop offset='0.796875' stopColor='#619DF2' stopOpacity='0.01' />
          <stop offset='1' stopColor='#619DF2' stopOpacity='0' />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function ColorfulCircularProgress({ size = 100, speed = 2, sx = {} }) {
	const [rotation, setRotation] = useState(0);

	useEffect(() => {
		setRotation(360);
		const interval = setInterval(() => {
			setRotation((prevRotation) => prevRotation + 360);
		}, speed * 1000);

		return () => {
			clearInterval(interval);
		};
	}, [speed]);

	const rotatingStyle = {
		width: `${size}`,
		height: `${size}`,
		transform: `rotate(${rotation}deg)`,
		transition: `transform ${speed}s linear`,
		...sx,
	};

	return <Testsample style={rotatingStyle} />;
}
