import React, { Fragment } from 'react';
import Playground, { type Schema } from './lib';
import SideMenu from './SideMenu';
import { AppSchemaStateForExport, AppSchemaStateForImport } from './recoilState';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';

const App = () => {
	const appSchemaStateForImport = useRecoilValue(AppSchemaStateForImport);
	const setAppSchemaStateForExport = useSetRecoilState(AppSchemaStateForExport);

	return (
		<Fragment>
			<SideMenu />
			<Playground
				schema={appSchemaStateForImport}
				onChange={(schema: Schema) => setAppSchemaStateForExport(schema)}
			/>
		</Fragment>
	);
};

const Wrapper = () => {
	return (
		<RecoilRoot>
			<App />
		</RecoilRoot>
	);
};

export default Wrapper;
