import { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { TextFieldV2, Typography } from '@midasit-dev/moaui';

const handleStyle = { left: 10 };

function TextUpdaterNode(props: any) {
	const { data, isConnectable } = props;
	const [textValue, setTextValue] = useState(data.value ? data.value : '');

	useEffect(() => {
		setTextValue(data.value);
	}, [data]);

	const onChange = (evt: any) => {
		// set the new text value
		setTextValue(evt.target.value);
		data.value = evt.target.value;
	};

	return (
		<div className='text-updater-node'>
			<Handle type='target' position={Position.Top} isConnectable={isConnectable} />
			<div>
				<Typography variant={'h1'}>Text:</Typography>
				<TextFieldV2 id='text' value={textValue} onChange={onChange} width={'200px'} />
			</div>
			<Handle
				type='source'
				position={Position.Bottom}
				id='a'
				style={handleStyle}
				isConnectable={isConnectable}
			/>
			<Handle type='source' position={Position.Bottom} id='b' isConnectable={isConnectable} />
		</div>
	);
}

export default TextUpdaterNode;
