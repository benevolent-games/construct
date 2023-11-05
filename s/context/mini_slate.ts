
import {slate} from "./slate.js"
import {MiniContext} from "./mini_context.js"
import {prepare_frontend} from "@benev/slate"

export type MiniSlate = ReturnType<typeof prepare_frontend<MiniContext>>
export const miniSlate = slate as MiniSlate

