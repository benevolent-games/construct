
import {Context, prepare_frontend} from "@benev/slate"

export type SlateFor<C extends Context> = ReturnType<typeof prepare_frontend<C>>

