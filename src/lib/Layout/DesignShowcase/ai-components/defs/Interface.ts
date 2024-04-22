export interface IListItem {
	functionId: string | number;
	functionName: string;
	functionLanguage: string;
	similarityScore: number;
}

export interface ISuggest {
	schema: Object;
	function: Object;
}

export interface ISelectionData {
	functionList?: Array<IListItem>;
}

export type IQueryKey = string | number | undefined;

export interface IFooterProps {
	onItemClick?: (item: ISuggest) => void;
}
