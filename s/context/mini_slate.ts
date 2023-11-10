
import {Slate} from "@benev/slate"

import {slate} from "./slate.js"
import {MiniContext} from "./mini_context.js"

export type MiniSlate = Slate<MiniContext>

export const miniSlate = slate as MiniSlate

