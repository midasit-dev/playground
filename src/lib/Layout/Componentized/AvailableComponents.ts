enum AvailableComps {
	Alert = 'Alert',
	Button = 'Button',
	ChartLine = 'ChartLine',
	Check = 'Check',
	Chip = 'Chip',
	CodeBlock = 'CodeBlock',
	DataGrid = 'DataGrid',
	DropList = 'DropList',
	Icon = 'Icon',
	IconButton = 'IconButton',
	Panel = 'Panel',
	Radio = 'Radio',
	ScatterPlot = 'ScatterPlot',
	Scrollbars = 'Scrollbars',
	Separator = 'Separator',
	Switch = 'Switch',
	Tab = 'Tab',
	TextField = 'TextField',
	TextFieldV2 = 'TextFieldV2',
	Typography = 'Typography',
	ColorPicker = 'ColorPicker',
}

function isAvailableComp(comp: string): comp is AvailableComps {
	return Object.values(AvailableComps).includes(comp as AvailableComps);
}

export { isAvailableComp };
