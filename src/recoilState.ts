import { atom } from 'recoil';
import { type Schema } from './lib/Common/types';

export const AppSchemaStateForImport = atom<Schema>({
	key: 'AppSchemaStateForImport',
	default: {},
});

export const AppSchemaStateForExport = atom<Schema>({
	key: 'AppSchemaStateForExport',
	default: {},
});
