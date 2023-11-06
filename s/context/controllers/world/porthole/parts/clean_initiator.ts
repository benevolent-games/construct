
import {Initiator} from "@benev/slate"

export abstract class CleanInitiator extends Initiator {
	#cleanups = new Set<() => void>()

	protected cleanup(routine: () => void) {
		this.#cleanups.add(routine)
	}

	deinit() {
		for (const cleanup of this.#cleanups)
			cleanup()
	}
}

