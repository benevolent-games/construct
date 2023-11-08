
import {SignalTower} from "@benev/slate"

import {flows} from "../flows.js"
import {Tree} from "../../tree/controller.js"
import {World} from "../../world/controller.js"
import {Gesture} from "../../gesture/controller.js"
import {EditorMode} from "../../gesture/editor_binds.js"

export abstract class Flow {
	constructor(protected options: FlowOptions) {}
	abstract modes: EditorMode[]
}

export const m = (...m: EditorMode[]) => m

export type AnyFlow = InstanceType<
	(typeof flows)[keyof typeof flows]
>

export type FlowName = keyof typeof flows

export type FlowHandlers<R = void> = {
	[P in FlowName]: (
		situation: InstanceType<(typeof flows)[keyof typeof flows]>
	) => R
}

export type FlowByName<N extends FlowName> = (
	InstanceType<(typeof flows)[N]>
)

export type FlowOptions = {
	signals: SignalTower,
	tree: Tree
	gesture: Gesture
	world: World
}

