
import {Context} from "../context/context.js"
import {QuickElement, requirement} from "@benev/frog"

export const component = requirement<Context>()<new() => QuickElement>

