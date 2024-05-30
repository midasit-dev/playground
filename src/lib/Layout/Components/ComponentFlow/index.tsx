import React from 'react';
import ReactFlow, {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	useNodesState,
	useEdgesState,
	Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

import TextFieldV2Comp from './TextField';
import ButtonComp from './Button';
import { Button } from '@midasit-dev/moaui';

// import './text-updater-node.css';

const initialNodes = [
	{
		id: 'node-1',
		type: 'textfieldV2',
		position: { x: 0, y: 0 },
		data: { value: 123 },
	},
];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textfieldV2: TextFieldV2Comp, button: ButtonComp };

function ComponentFlow() {
	const [nodes, setNodes] = useNodesState(initialNodes);
	const [edges, setEdges] = useEdgesState([]);

	// React.useEffect(() => {
	// 	console.log('nodes', nodes);
	// }, [nodes]);

	// React.useEffect(() => {
	// 	console.log('edges', edges);
	// }, [edges]);

	const onClickButtonComp = (nodeId: any, _edges: any) => {
		const isConnected = _edges.some((edge: any) => {
			console.log('Comp Edge', edge);
			return edge.source === nodeId || edge.target === nodeId;
		});
		if (!isConnected) {
			console.log('not connected');
			return;
		}

		setNodes((prevNodes: any) =>
			prevNodes.map((node: any) =>
				node.id === 'node-1' ? { ...node, data: { ...node.data, value: 456 } } : node,
			),
		);
	};

	function onClickButton() {
		setNodes((nds: any) => {
			return nds.concat({
				id: 'node-2',
				type: 'button',
				position: { x: 0, y: 100 },
				data: { onclick: onClickButtonComp },
			});
		});
	}

	const onNodesChange = React.useCallback(
		(changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
		[setNodes],
	);

	const onEdgesChange = React.useCallback(
		(changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
		[setEdges],
	);
	const onConnect = React.useCallback(
		(connection: any) => setEdges((eds: any) => addEdge(connection, eds)),
		[setEdges],
	);

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<Button variant='contained' width='200px' color='normal' onClick={onClickButton}>
				Add
			</Button>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
				fitView
			>
				<Background />
			</ReactFlow>
		</div>
	);
}

export default ComponentFlow;
