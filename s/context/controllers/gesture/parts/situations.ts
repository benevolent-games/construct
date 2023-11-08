
import {Pojo, ob} from "@benev/slate"
import {Context} from "../../../context.js"

export type SituationClass = new(...args: any[]) => any
export type Situations = Pojo<SituationClass>

export class SituationRoom<S extends Situations> {
	current: InstanceType<SituationClass> | null = null
	navigate: {[P in keyof S]: (...params: ConstructorParameters<S[P]>) => InstanceType<S[P]>}
	situations: S

	constructor(prep_situations: (room: SituationRoom<S>) => S) {
		const situations = prep_situations(this)
		this.situations = situations
		this.navigate = ob.map(situations, S => (...params) => {
			const instance = new S(...params)
			this.current = instance
			return instance
		})
	}
}

export const prep_room = (context: Context) => new SituationRoom(room => ({

	normal: class {
		constructor() {
			context.gesture.modes
				.wipe()
				.enable("plain")
				.enable("history")
				.enable("selectable")
		}
		enter_flycam() {
			room.navigate.flycam()
		}
	},

	flycam: class {
		constructor() {
			this.#reset()
		}
		#reset() {
			context.gesture.modes
				.wipe()
				.enable("flycam")
				.enable("fps")
				.enable("history")
				.enable("selectable")
		}
		grab(after: (complete: boolean) => void) {
			context.gesture.modes
				.wipe()
				.enable("operation")
				.enable("flycam_grabbed")
			return {
				complete: () => {
					this.#reset()
					after(true)
				},
				exit: () => {
					this.#reset()
					after(false)
				},
			}
		}
	},

}))

