import { atom } from 'recoil';

export const fetchingStateAtom = atom({
	key: 'fetchingState',
	default: false,
});
