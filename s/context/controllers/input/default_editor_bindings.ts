
export type EditorBindings = ReturnType<typeof default_editor_bindings>

export const default_editor_bindings = () => ({
	buttons: {
		select: "LMB",
		fly: "RMB",

		forward: "KeyW",
		backward: "KeyS",
		leftward: "KeyA",
		rightward: "KeyD",

		up: "KeyI",
		down: "KeyK",
		left: "KeyJ",
		right: "KeyL",
	},
	vectors: {
		look: "mouse",
	},
})

