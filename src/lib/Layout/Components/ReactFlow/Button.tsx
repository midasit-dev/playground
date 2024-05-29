import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Button, Typography } from '@midasit-dev/moaui';
import { useEdges } from 'reactflow';

const handleStyle = { left: 10 };

function ButtonComp(props: any) {
	const { id, data, isConnectable } = props;
	const edges = useEdges();

	function onClickButton() {
		data.onclick && data.onclick(id, edges);
	}

	return (
		<div className='text-updater-node'>
			<Handle type='target' position={Position.Top} isConnectable={isConnectable} />
			<div>
				<Typography variant={'h1'}>Click</Typography>
				<Button variant='contained' width='200px' color='normal' onClick={onClickButton}>
					Run
				</Button>
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

export default ButtonComp;
