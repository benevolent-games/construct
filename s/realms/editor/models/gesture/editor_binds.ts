
import {Modes} from "../../../../tools/impulse/modes.js"
import {Binds, Mode, binds} from "../../../../tools/impulse/binds.js"

export type EditorBinds = ReturnType<typeof editor_binds> & Binds
export type EditorMode = Mode<EditorBinds>
export type EditorModes = Modes<EditorMode>

export const editor_binds = () => binds(({
		mode, buttons, b, modless, ctrl, shift,
	}) => ({

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

	history: mode({
		vectors: {},
		buttons: {
			undo: buttons(b("KeyZ", ctrl), b("KeyZ")),
			redo: buttons(b("KeyZ", ctrl, shift), b("KeyZ", shift)),
		},
	}),

	outline: mode({
		vectors: {},
		buttons: {
			select: buttons(b("LMB")),
			select_visible: buttons(b("KeyA"), b("KeyE")),
			select_everything: buttons(b("KeyA", shift)),
			delete_selected: buttons(b("KeyX"), b("Backspace")),
		},
	}),

	flycam: mode({
		vectors: {},
		buttons: {
			exit_flycam: buttons(b("RMB")),
			grab: buttons(b("KeyF")),
		},
	}),

	flycam_grabbed: mode({
		vectors: {},
		buttons: {
			exit_flycam: buttons(b("RMB")),
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

