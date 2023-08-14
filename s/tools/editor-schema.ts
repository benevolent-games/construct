
import {BindingsSchema} from "@benev/nubs"

export const editor_schema = {
	selection: {
		pointer: {},
		stick: {},
		key: {
			select: {causes: ["Mouse1"]},
			clear_selection: {causes: ["KeyD"]},
			duplicate: {causes: ["ShiftLeft", "KeyW"]},
			delete: {causes: ["ShiftLeft", "KeyX"]},
			pointer_lock: {causes: ["KeyF"]}
		},
	},

	transform: {
		pointer: {},
		stick: {},
		key: {
				grab: {causes: ["KeyG"]},
				rotate: {causes: ["KeyR"]},
				scale: {causes: ["KeyS"]},
		},
	},

	fly: {
		pointer: {
			look: {causes: ["Pointer", "Lookpad"]},
		},
		stick: {
			move: {causes: ["Stick"]},
			look: {causes: ["Stick2"]},
		},
		key: {
			move_forward: {causes: ["KeyE", "ArrowUp"]},
			move_backward: {causes: ["KeyD", "ArrowDown"]},
			move_leftward: {causes: ["KeyS", "ArrowLeft"]},
			move_rightward: {causes: ["KeyF", "ArrowRight"]},

			move_fast: {causes: ["ShiftLeft"]},
			move_slow: {causes: ["CapsLock"]},

			jump: {causes: ["Space"]},
			crouch: {causes: ["KeyZ"]},

			look_up: {causes: ["KeyI"]},
			look_down: {causes: ["KeyK"]},
			look_left: {causes: ["KeyJ"]},
			look_right: {causes: ["KeyL"]},

			look_fast: {causes: ["Slash"]},
			look_slow: {causes: ["Period"]},
		},
	}
} satisfies BindingsSchema
