
import {Nexus} from "@benev/slate"

import {slate} from "./slate.js"
import {MiniContext} from "./mini_context.js"

export type MiniSlate = Nexus<MiniContext>

export const miniSlate = slate as MiniSlate

