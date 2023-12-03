
import {ZipAction} from "@benev/slate"

import {Spatial} from "./spatial.js"
import {Item} from "../outline/types.js"
import {actionate} from "../actionate.js"
import {Id} from "../../../tools/fresh_id.js"
import {move_into_folder} from "./shimmy/move_into_folder.js"
import {OutlineGenius} from "../../controllers/outline_genius/controller.js"
import {move_beside_another_item} from "./shimmy/move_beside_another_item.js"

export type OutlineActions = ZipAction.Callable<typeof outline>

export const outline = actionate.outline.blueprint(action => ({
	move_into_folder,
	move_above_another_item: move_beside_another_item("above"),
	move_below_another_item: move_beside_another_item("below"),

	add: action(outline => (additions: {
			item: Item.Whatever,
			folderId: Id,
		}[]) => {
		for (const {folderId, item} of additions) {
			const folder = outline.getFolder(folderId)
			folder.children.unshift(item)
		}
	}),

	delete: action(outline => (...ids: Id[]) => {
		const reports = outline
			.reports
			.filter(report => ids.includes(report.item.id))
		for (const {item, parent} of reports)
			parent.children = (
				parent.children.filter(child => child.id !== item.id)
			)
	}),

	...(() => {
		const select = (outline: OutlineGenius) => (...ids: Id[]) => {
			const items = outline.items.filter(item => ids.includes(item.id))
			for (const item of items)
				if (item.id !== outline.root.id)
					item.selected = true
		}

		const deselect = (outline: OutlineGenius) => (...ids: Id[]) => {
			const items = outline.items.filter(item => ids.includes(item.id))
			for (const item of items)
				item.selected = false
		}

		const clear_selection = (outline: OutlineGenius) => () => {
			for (const item of outline.items)
				item.selected = false
		}

		return {
			select: action(select),
			clear_selection: action(clear_selection),
			deselect: action(deselect),

			clear_then_select: action(outline => (...ids: Id[]) => {
				clear_selection(outline)()
				select(outline)(...ids)
			}),

			clear_then_deselect: action(outline => (...ids: Id[]) => {
				clear_selection(outline)()
				deselect(outline)(...ids)
			}),
		}
	})(),

	show: action(outline => (...ids: Id[]) => {
		const items = outline.items.filter(item => ids.includes(item.id))
		for (const item of items)
			item.visible = true
	}),

	hide: action(outline => (...ids: Id[]) => {
		const items = outline.items.filter(item => ids.includes(item.id))
		for (const item of items)
			item.visible = false
	}),

	set_spatial: action(outline => (...directives: {id: Id, spatial: Spatial}[]) => {
		for (const {id, spatial} of directives) {
			const item = outline.getItem(id) as Item.Instance | Item.Light
			item.spatial = spatial
		}
	}),
}))

