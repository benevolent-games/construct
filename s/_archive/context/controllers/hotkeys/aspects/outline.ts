
import {buttons} from "../parts/buttons.js"
import {Edcore} from "../../edcore/controller.js"
import {Gesture} from "../../gesture/controller.js"
import {OutlineGenius} from "../../outline_genius/controller.js"

export const outline_hotkeys = (
		edcore: Edcore,
		outline: OutlineGenius,
		gesture: Gesture,
	) => {

	function select_all({visibleOnly}: {
			visibleOnly: boolean,
		}) {

		const anything_is_selected = outline.selected.length > 0

		if (anything_is_selected)
			edcore.actions.outline.clear_selection()

		else
			edcore.actions.outline.select(
				...outline.items
					.filter(item => visibleOnly
						? outline.isApparent(item.id)
						: true
					)
					.map(item => item.id)
			)
	}

	return buttons(gesture.on.outline.buttons, {
		select: () => {},

		delete_selected() {
			const {selected} = outline
			if (selected.length > 0) {
				edcore.actions.outline.delete(
					...selected.map(item => item.id)
				)
			}
		},

		select_visible: () => select_all({visibleOnly: true}),
		select_everything: () => select_all({visibleOnly: false}),
	})
}

