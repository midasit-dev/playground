import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Card, CardContent } from "@mui/material";
import Stack from "@mui/material/Stack";
import { AnimatePresence, motion } from "framer-motion";

interface IContentLoadingSkeletonProps {
    items?: number;
}

export const ContentLoadingSkeleton = React.forwardRef((props: IContentLoadingSkeletonProps, ref: any) => {
    const repeater = React.useMemo(() => Array.from({ length: props?.items || 5 }), [props?.items]);
    
    return (
        <Stack direction="row" spacing={2} ref={ref}>
            <AnimatePresence mode="popLayout">
                {
                    repeater.map((value: any, index: number) => {
                        return (
                            <motion.div key={`ai-response-skeleton-${Math.random()}`} initial={{
                                y: 100,
                                opacity: 0,
                            }}
                            animate={{
                                y: 0,
                                opacity: 1,
                            }}
                            exit={{
                                y: 100,
                                opacity: 0,
                            }}
                            transition={{
                                delay: index * 0.1,
                                type: "spring",
                            }} >
                                <Card sx={{width: "10rem", height: "7.5rem"}}>
                                    <CardContent>
                                        <Skeleton variant="text" width="100%" />
                                        <Skeleton variant="text" width="100%" />
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })
                }
            </AnimatePresence>
        </Stack>
    )
});