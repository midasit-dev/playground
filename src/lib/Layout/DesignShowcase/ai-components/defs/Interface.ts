export interface IListItem {
	functionId: string | number;
	functionName: string;
	similarityScore: number;
}

export interface ISelectionData {
	functionList?: Array<IListItem>;
}

export type IQueryKey = string | number | undefined;

export interface IFooterProps {
	onItemClick?: (item: IListItem) => void;
}
