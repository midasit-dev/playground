import Import from './Import';
import View from './View';
import Export from './Export';
import { GuideBox, Separator, Typography } from '@midasit-dev/moaui';

const App = () => {
	return (
		<GuideBox
			show
			row
			verCenter
			spacing={2}
			fill='#fff'
			paddingY={1}
			paddingX={2}
			borderRadius={1}
			border='1px solid #d1d1d1'
		>
			<Typography variant='h1'>JSON</Typography>
			<GuideBox>
				<GuideBox row verCenter spacing={1}>
					<Export />
					<Import />
				</GuideBox>
			</GuideBox>
			<Separator direction='vertical' />
			<GuideBox>
				<View />
			</GuideBox>
		</GuideBox>
	);
};

export default App;
