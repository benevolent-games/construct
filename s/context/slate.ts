
import {setup, SlateFor} from "@benev/slate"

import {Context} from "./context.js"

export type Slate = SlateFor<Context>
export const slate = setup<Context>()

