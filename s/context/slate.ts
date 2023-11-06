
import {prepare_frontend, SlateFor} from "@benev/slate"

import {Context} from "./context.js"

export type Slate = SlateFor<Context>
export const slate = prepare_frontend<Context>()

