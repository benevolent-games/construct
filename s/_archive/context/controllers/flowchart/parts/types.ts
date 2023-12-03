
import {flows} from "../flows.js"
import {World} from "../../world/controller.js"
import {Edcore} from "../../edcore/controller.js"
import {Gesture} from "../../gesture/controller.js"
import {OutlineGenius} from "../../outline_genius/controller.js"

export type FlowOptions = {
	edcore: Edcore
	gesture: Gesture
	world: World
	outline: OutlineGenius
}

export type AnyFlow = InstanceType<
	(typeof flows)[keyof typeof flows]
>

export type FlowName = keyof typeof flows

export type FlowHandlers<R = void> = {
	[P in FlowName]: (
		situation: InstanceType<(typeof flows)[keyof typeof flows]>
	) => R
}

export type FlowClassByName<N extends FlowName> = (
	(typeof flows)[N]
)

export type FlowByName<N extends FlowName> = (
	InstanceType<(typeof flows)[N]>
)

export type MoreParams<C> = (
	C extends new(options: any, ...more: infer P) => any
		? P
		: never
)

