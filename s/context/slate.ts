
import {prepare_frontend} from "@benev/slate"

import {Context} from "./context.js"
import {SlateFor} from "../tools/slate_for.js"

export type Slate = SlateFor<Context>
export const slate = prepare_frontend<Context>()

