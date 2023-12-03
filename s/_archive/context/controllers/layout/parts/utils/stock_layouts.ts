
import {Layout} from "../types.js"
import {freshId} from "../../../../../tools/fresh_id.js"

export type StockLayouts = {
	empty: () => Layout.Cell
	default: () => Layout.Cell
}

