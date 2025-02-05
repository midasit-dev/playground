import React from 'react';
import { GuideBox, Icon, IconButton, TextField, Tooltip, Dialog } from '@midasit-dev/moaui';
import onClickHandler from '../../Shared/OnClickHandler';
import { useRecoilValue } from 'recoil';
import { CanvasState, LayersState } from '../recoilState';
import { ExportSchema, Layer, Layers } from '../../Common/types';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentTime } from '../../Shared/GetCurrentTime';

function replaceIds(layers: Layers, saveUUID: string): Layers {
	function createNewId(id: string) {
		const idArr = id.split('-');
		if (idArr.length === 3) idArr.push(saveUUID);
		if (idArr.length === 4) idArr[3] = saveUUID;
		if (idArr.length !== 3 && idArr.length !== 4) throw new Error('Invalid id Type');
		return idArr.join('-');
	}

	function findAndReplaceId(layer: Layer): Layer {
		return {
			...layer,
			id: createNewId(layer.id),
			children: layer.children ? layer.children.map(findAndReplaceId) : [],
		};
	}

	return layers.map((layer) => findAndReplaceId(layer));
}

const App = (props: { openJsonExportMenu: boolean; setOpenJsonExportMenu: any }) => {
	const { openJsonExportMenu, setOpenJsonExportMenu } = props;
	const [value, setValue] = React.useState<string>('');
	const [open, setOpen] = React.useState(false);
	const canvas = useRecoilValue(CanvasState);
	const layers = useRecoilValue(LayersState);

	const { enqueueSnackbar } = useSnackbar();

	React.useEffect(() => {
		setOpen(openJsonExportMenu);
	}, [openJsonExportMenu, setOpenJsonExportMenu]);

	function onClose() {
		setOpen(false);
		setOpenJsonExportMenu(false);
	}

	return (
		<GuideBox width='100%' row horSpaceBetween spacing={1}>
			<Dialog
				open={open}
				setOpen={setOpen}
				onClose={onClose}
				headerTitle='Select Layer Export JSON'
			>
				<GuideBox spacing={2} row>
					<GuideBox flexGrow={1}>
						<TextField
							width='200px'
							placeholder={getCurrentTime().sample('.json')}
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
					</GuideBox>
					<Tooltip title='Save Layer JSON'>
						<IconButton
							color='negative'
							onClick={async () => {
								//동일한 id, key일 경우 리렌더링이 되지 않는 문제 해결을 위해
								//id값에 uuid를 붙여준다.
								//저장 시점 UUID 기록
								const saveUUID = uuidv4().slice(0, 8);

								let prevValue = value;
								if (prevValue === '') {
									prevValue = getCurrentTime().fullWithExtension('json');
								}
								if (!prevValue.includes('.json')) prevValue += '.json';
								const ExportSchema: ExportSchema = {
									canvas: {
										width: canvas.width,
										height: canvas.height,
									},
									layers: replaceIds(layers, saveUUID),
								};

								const data = await onClickHandler({
									path: './exports/layers',
									body: {
										fileName: prevValue,
										content: JSON.stringify(ExportSchema, null, 2),
									},
									method: 'post',
								});

								if (data.message) {
									enqueueSnackbar(data.message, { variant: 'success' });
								}
							}}
						>
							<Icon iconName='Save' />
						</IconButton>
					</Tooltip>
				</GuideBox>
			</Dialog>
		</GuideBox>
	);
};

App.defaultProps = {
	openJsonExportMenu: false,
	setOpenJsonExportMenu: () => {},
};

export default App;
