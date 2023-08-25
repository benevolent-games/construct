
import {Context} from "../context/context.js"
import {BaseElement, requirement} from "@benev/frog"

export const component = requirement<Context>()<new() => BaseElement>

