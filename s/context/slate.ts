
import {Context} from "./context.js"
import {prepare_frontend} from "@benev/slate"

export type Slate = ReturnType<typeof prepare_frontend<Context>>
export const slate = prepare_frontend<Context>()

