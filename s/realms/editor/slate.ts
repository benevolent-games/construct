
import {Slate} from "@benev/slate"
import {EditorContext} from "./context.js"
import {slate as fabric_slate} from "../fabric/slate.js"

export const slate = fabric_slate as Slate<EditorContext>

