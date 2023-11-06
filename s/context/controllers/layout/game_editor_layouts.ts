
import {empty_layout} from "./empty_layout.js"
import {StockLayouts} from "./parts/utils/stock_layouts.js"

const plain = empty_layout("AboutPanel")

export const game_editor_layouts = {
	empty: plain,
	default: plain,
} satisfies StockLayouts

