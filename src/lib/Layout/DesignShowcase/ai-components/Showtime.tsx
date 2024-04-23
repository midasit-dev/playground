import React from 'react';

import { ISuggest } from './defs/Interface';
import { useRecoilValue } from 'recoil';
import { CanvasState } from '../../recoilState';

import Typography from "@mui/material/Typography";

import { motion, AnimatePresence } from 'framer-motion';
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";

function getRandomArbitrary(min: number, max: number) {
	return Number(Number(Math.random() * (max - min) + min).toFixed(0));
}
  
const ShowTime = React.forwardRef((props: any, ref: any) => {
	const canvasState = useRecoilValue(CanvasState);

	const [showLoadingDlg, setLoadingDig] = React.useState<boolean>(false);
	const [loadingDlgOverlayText, setLoadingDlgOverlayText] = React.useState<string>("");
    const [textStream, setTextStream] = React.useState<string>("");
	let abortSignal = new AbortController();

	const doStartJob = React.useCallback(async (item: string) => {
		setLoadingDig(true);
		setTextStream("");
		// simulate item.schema(string) into stream of text. each text will split by space, and show each text in 1 second interval.
		abortSignal = new AbortController();
		const text = JSON.stringify(item, null, 4) as string;
		let start = 0;
		let rpt = 0;
		
		setLoadingDlgOverlayText("Prepairing...");
		const sleep = (time: number) => new Promise((resolve) => {
			setTimeout(() => {
				resolve("");
			}, time)
		});

		await sleep(1000);
		setLoadingDlgOverlayText("Processing UI Schema...");
		await new Promise((resolve, reject) => {
			const interval = setInterval(() => {
				setLoadingDlgOverlayText("Processing UI Schema" + ".".repeat(rpt % 3));
				let sliceBy = getRandomArbitrary(5, 10);
				if (start < text.length) {
					start += sliceBy;
					rpt++;
					if (start > text.length) start = text.length;
					setTextStream(text.substring(0, start));
				} else {
					setTextStream(text);
					setLoadingDlgOverlayText("Awaiting Text Stream...");
					clearInterval(interval);
					setTimeout(() => {
						resolve("");
					}, 1000);
				}
			}, 10);
		})
		setLoadingDig(false);
		props?.onItemClick?.(item);
	}, []);

	React.useImperativeHandle(ref, () => ({
		doStartJob,
	}), [doStartJob]);

    return (
        <AnimatePresence>
        {
            showLoadingDlg &&
            <motion.div
                key="testPanelDialog"
                initial={{
					x: 500,
					y: 500,
					scale: 0,
                }}
                animate={{
					x: [500,250,0],
					y: [450,250,0],
					scale: [0.5, 0.75, 1],
                    opacity: 1,
                }}
                exit={{
					x: 500,
					y: 500,
					scale: 0,
                    opacity: 0,
                }}
                transition={{
                    type: 'spring',
                    duration: 1,
                }}
                style={{
                    position: "relative",
					width: canvasState.width,
					height: canvasState.height,
					top: props?.startY,
					left: props?.startX,
                }}
            >
                <Box className="wrapper-box shadow-xl shadow-black/10 border border-pg-gray-medium rounded-md bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg" display="flex" height="100%">
                    <Stack direction="column" margin={2} height="100%" overflow="hidden">
                        <Typography style={{whiteSpace: "pre", fontSize: "12px"}}>{textStream}</Typography>
                    </Stack>
                    <Stack height="100%" width="100%" direction="column" position="absolute" alignItems="center" justifyContent="center" sx={{
                        backgroundColor: "#ffffff67",
                        borderRadius: "4px",
                        border: "1px solid #0000001f",
                    }}>
						<Stack alignItems="center" justifyContent="space-between" width="15rem" height="8.5rem" spacing={10}>
							<motion.div
								animate={{
									scale: [1, 2, 2, 1, 1],
									rotate: [0, 0, 180, 180, 0],
									borderRadius: ["0%", "0%", "50%", "50%", "0%"]
								}}
								transition={{
									duration: 2,
									ease: "easeInOut",
									times: [0, 0.2, 0.5, 0.8, 1],
									repeat: Infinity,
									repeatDelay: 1
								}}
								style={{
									background: "#3b8d99",
									width: "3.5rem",
									zIndex: "1500",
									height: "3.5rem",
								}}
							/>
                        	{loadingDlgOverlayText}
						</Stack>
                    </Stack>
                </Box>
            </motion.div>
        }
    </AnimatePresence>
    )
});

export default ShowTime;