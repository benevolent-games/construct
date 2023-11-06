
import {slate} from "./slate.js"
import {SlateFor} from "@benev/slate"
import {MiniContext} from "./mini_context.js"

export type MiniSlate = SlateFor<MiniContext>

export const miniSlate = slate as MiniSlate

