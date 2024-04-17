export interface IListItem {
	functionId: string | number;
	functionName: string;
	similarityScore: number;
}

export interface ISelectionData {
	functionList?: Array<IListItem>;
}
