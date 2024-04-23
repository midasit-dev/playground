import { atom } from 'recoil';

export const fetchingStateAtom = atom({
	key: 'fetchingState',
	default: false,
});

export const loadingTargetStateAtom = atom({
	key: 'loadingTargetState',
	default: null,
});
