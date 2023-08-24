
import {requirement} from "@benev/frog"
import {CellView} from "./views/cell.js"
import {Context} from "../../context/context.js"

export const views = (context: Context) => requirement.provide(context)({
	CellView,
})

