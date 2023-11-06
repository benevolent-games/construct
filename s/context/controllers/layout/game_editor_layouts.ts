
import {StockLayouts} from "./parts/utils/stock_layouts.js"
import {single_panel_layout} from "./single_panel_layout.js"

export const game_editor_layouts = {
	empty: single_panel_layout("AboutPanel"),
	default: single_panel_layout("AboutPanel"),
} satisfies StockLayouts

