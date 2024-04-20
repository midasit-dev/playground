export const canvas_snap_criteria = 8;
export const nearestMultipleOfCanvasSnapCriteria = (value: number) => {
	return Math.ceil(value / canvas_snap_criteria) * canvas_snap_criteria;
};

export const components_inner_layer_bgColor = 'rgba(98, 186, 243, .4)';
// export const components_inner_layer_bgColor_selected = 'rgba(133, 255, 0, .7)'
export const components_inner_layer_bgColor_selected = '#0786c8';
