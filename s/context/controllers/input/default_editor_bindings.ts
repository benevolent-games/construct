
export type EditorBindings = ReturnType<typeof default_editor_bindings>

export const default_editor_bindings = () => ({
	buttons: {
		select: "LMB",
		forward: "KeyW",
		backward: "KeyS",
		leftward: "KeyA",
		rightward: "KeyD",
	},
	vectors: {
		look: "mouse",
	},
})

