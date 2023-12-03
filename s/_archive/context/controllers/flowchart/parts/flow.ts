
import {FlowOptions} from "./types.js"
import {EditorMode} from "../../gesture/editor_binds.js"

export type FlowCleanup = () => void
export type FlowInit = (cleanup: FlowCleanup) => void

export const m = (...m: EditorMode[]) => m

export abstract class Flow {
	#cleanups = new Set<() => void>()

	init: FlowInit = cleanup => this.#cleanups.add(cleanup)
	constructor(protected options: FlowOptions, ..._more: any[]) {}
	abstract modes: EditorMode[]

	deinit() {
		for (const cleanup of this.#cleanups)
			cleanup()
	}
}

