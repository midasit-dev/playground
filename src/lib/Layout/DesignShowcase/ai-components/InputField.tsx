import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";

import debounce from "lodash/debounce";
import useTheme from "@mui/material/styles/useTheme";

const debouncedFunc = debounce((callback, value, setter) => {
	if (value.trim() === "") return;
	callback(value, setter);
}, 500);

interface IChatInputProps {
    onSend?: (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => void;
    onStop?: () => void;
    disabled?: boolean;
    maxWidth?: string;
}

const ChatInput = React.forwardRef((props: IChatInputProps, ref) => {
	const [userInput, setUserInput] = React.useState("");
	const { onSend, disabled } = props;
	const [localDisabled, setLocalDisabled] = React.useState(disabled);
	const [sendTooltipMessage, setSendTooltipMessage] = React.useState<null | string>(null);
	const theme = useTheme();

	React.useEffect(() => {
		if (disabled) {
			setLocalDisabled(false);
			setUserInput("");
		}
	}, [disabled]);

	const handleChange = React.useCallback((value: string) => {
		if (!disabled)
			setUserInput(value || "");
	}, [disabled]);

	const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
		if (disabled) return;
		if (event.code === "Enter") {
			if (!event.shiftKey && !event.altKey) {
				event.preventDefault();
				setLocalDisabled(true);
				debouncedFunc(onSend, userInput, setUserInput);
			}
		}
	}, [disabled, onSend, userInput]);

	return (
		<Stack direction="column" width="100%" sx={(theme) => ({
			background: theme.palette.mode === "dark" ? "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.75))" : "linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.75))",
			backdropFilter: "blur(4px)",
		})}>
			<Stack
				direction="column"
				display="flex"
				spacing={1}
				marginX={1}
				marginBottom={1}
				data-color-mode={theme.palette.mode}
				alignItems="center"
			>
				<TextField
                    multiline
                    value={userInput}
                    fullWidth
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    maxRows={20}
                    disabled={disabled || localDisabled}
                    placeholder="type here"
                    size="small"
                    sx={(theme) => ({
                            width: "100%",
                            maxWidth: props.maxWidth,
                        })
                    }
					InputProps={{
						endAdornment:
						<React.Fragment>
							<Tooltip title={sendTooltipMessage} open={sendTooltipMessage === null}>
								<Button
									size="small"
									variant="text"
									onClick={() => {
										if (!disabled) {
											debouncedFunc(onSend, userInput, setUserInput);
											setLocalDisabled(true);
										}
										if (disabled) {
											props?.onStop?.();
											setSendTooltipMessage("작업이 중단되었습니다.");
											setLocalDisabled(false);
											setTimeout(() => {
												setSendTooltipMessage(null);
											}, 3000);
										}
									}}
									sx={() => ({
										minWidth: "36px",
										height: "36px",
										width: "36px",
									})}
								>
									{( !(disabled || localDisabled) ) && <SendIcon />}
									{( disabled || localDisabled ) && <CircularProgress size="18px" />}
								</Button>
							</Tooltip>
						</React.Fragment>
					}}
                />
			</Stack>
		</Stack>
	)
});

ChatInput.defaultProps = {
	onSend: (value: string) => {},
	onStop: () => {},
	disabled: false,
	maxWidth: "50rem",
};

export default ChatInput;