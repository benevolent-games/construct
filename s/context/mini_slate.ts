
import {slate} from "./slate.js"
import {MiniContext} from "./mini_context.js"
import {SlateFor} from "../tools/slate_for.js"

export type MiniSlate = SlateFor<MiniContext>
export const miniSlate = slate as MiniSlate

