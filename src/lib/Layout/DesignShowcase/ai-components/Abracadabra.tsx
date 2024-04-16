import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Stack } from "@midasit-dev/moaui"
import InputField from "./InputField";
import Selection from "./Selection";
import { IListItem } from "./defs/Interface";
import { ContentLoadingSkeleton } from "./Skeletons";
import { AnimatePresence } from "framer-motion";
import { useQueryClient } from "react-query";
import { QueryKeys } from "./defs/QueryKeys";
import { uniqueId } from "lodash";

interface IFooterProps {
    onItemClick?: (item: IListItem) => void;
}

function Footer(props: IFooterProps) {
    const [disabled, setDisabled] = React.useState(false);
    const queryClient = useQueryClient();

    return (
        <React.Fragment>
            <Stack position="fixed" bottom={0} left={0} right={0} display="flex" alignItems="center" width="100%" spacing={2}>
                <Stack direction="row" spacing={2}>
                    <ErrorBoundary fallback={<div />}>
                        <AnimatePresence mode="popLayout">
                            <React.Suspense key="keys-for-suspense-root" fallback={<ContentLoadingSkeleton key="key-for-suspense-selection" items={3} />}>
                                <Selection key="key-for-selection" onClick={props?.onItemClick} />
                            </React.Suspense>
                        </AnimatePresence>
                    </ErrorBoundary>
                </Stack>
                <InputField disabled={disabled} onSend={(value: string) => {
                    setDisabled(true);

                    if (value !== "") {
                        // queryClient.refetchQueries([QueryKeys.SELECTION_KEY]);
                        queryClient.setQueryData(QueryKeys.SELECTION_KEY, (prev: Array<IListItem> | undefined) => {
                            if (!prev) return [{ functionId: uniqueId(), functionName: value, score: 0.9 }];
                            return [...prev, { functionId: uniqueId(), functionName: value, score: 0.9 }];
                        });
                    }
                    setTimeout(() => {
                        setDisabled(false);
                    }, 3000);
                }} onStop={() => { setDisabled(true) }} />
            </Stack>
        </React.Fragment>
    )
}

export default Footer;