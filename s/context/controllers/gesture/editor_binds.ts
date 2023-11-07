
import {binds} from "../../../tools/impulse/binds.js"

export type EditorBinds = ReturnType<typeof editor_binds>

export const editor_binds = () => binds(({
		mode, buttons, b, modless, ctrl, shift,
	}) => ({

	always: mode({
		vectors: {},
		buttons: {
			undo: buttons(b("KeyZ", ctrl)),
			redo: buttons(b("KeyZ", ctrl, shift)),
		},
	}),

	plain: mode({
		vectors: {},
		buttons: {
			enter_flycam: buttons(b("RMB")),
			move: buttons(b("KeyF")),
			rotate: buttons(b("KeyR")),
			scale: buttons(b("KeyV")),
		},
	}),

	fps: mode({
		vectors: {look: ["mouse"]},
		buttons: {
			grab: buttons(b("KeyG")),
			trackball: buttons(b("KeyG")),
			scale: buttons(b("KeyG")),

			forward: buttons(modless("KeyW")),
			backward: buttons(modless("KeyS")),
			leftward: buttons(modless("KeyA")),
			rightward: buttons(modless("KeyD")),

			crouch: buttons(modless("KeyC")),
			rise: buttons(modless("Space")),

			up: buttons(modless("KeyI")),
			down: buttons(modless("KeyK")),
			left: buttons(modless("KeyJ")),
			right: buttons(modless("KeyL")),
		},
	}),

	selectable: mode({
		vectors: {},
		buttons: {
			select: buttons(b("LMB")),
		},
	}),

	flycam: mode({
		vectors: {},
		buttons: {
			exit_flycam: buttons(b("RMB")),
			grab: buttons(b("KeyF")),
			trackball: buttons(b("KeyR")),
			scale: buttons(b("KeyV")),
		},
	}),

	operation: mode({
		vectors: {},
		buttons: {
			complete: buttons(b("LMB")),
			cancel: buttons(b("KeyZ"))
		},
	}),

}))
