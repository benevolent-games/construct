
import {TemplateResult, html} from "lit"

import {Layout} from "../parts/layout.js"
import {tiles} from "../../../tiles/tiles.js"
import {LayoutMeta} from "./utils/layout_meta.js"
import {sprite_x} from "../../../sprites/groups/feather/x.js"
import {sprite_plus} from "../../../sprites/groups/feather/plus.js"
import {DragDestinationHandlers, DragSourceHandlers} from "../parts/dragger.js"

export const render_tabs = (meta: LayoutMeta, node: Layout.Pane, pane_path: number[]) => html`
	${[

		...node.children.map((leaf, index) => {
			const {icon, label} = tiles[leaf.tab]
			const leaf_path = [...pane_path, index]
			return html`
				${tab({
					id: leaf.id,
					content: icon,
					title: label,
					removable: true,
					active: node.active_leaf_index === index,
					activate: () => meta.layout.set_pane_active_leaf(pane_path, index),
					close: () => meta.layout.delete_leaf(leaf_path),
					drag_source_handlers: meta.dragger.source_handlers(leaf_path),
					drag_destination_handlers: meta.dragger.destination_handlers(leaf_path),
				})}
			`
		}),

		tab({
			id: undefined,
			content: sprite_plus,
			title: "add new tab",
			removable: false,
			active: node.active_leaf_index === undefined,
			activate: () => meta.layout.set_pane_active_leaf(pane_path, undefined),
			close: () => {},
			drag_destination_handlers: meta.dragger.destination_handlers([...pane_path, node.children.length]),
		}),

	].map(tab => html`<div class=inserter></div>${tab}`)}
`

function tab({
		id, content, title, removable, active,
		activate, close,
		drag_source_handlers = {
			dragstart: () => {},
			dragend: () => {},
		},
		drag_destination_handlers = {
			dragenter: () => {},
			dragleave: () => {},
			dragover: () => {},
			drop: () => {},
		},
	}: {
		id: number | undefined
		content: string | TemplateResult
		title: string
		removable: boolean
		active: boolean
		activate: () => void
		close: () => void
		drag_source_handlers?: DragSourceHandlers
		drag_destination_handlers?: DragDestinationHandlers
	}) {

	const click = (event: MouseEvent) => {
		if (removable && active) {
			const target = event.target as Element
			const tab = event.currentTarget as HTMLElement
			const x = tab.querySelector(".x") as HTMLElement
			const click_is_inside_x = event.target === x || x.contains(target)

			if (click_is_inside_x)
				close()
		}
		else
			activate()
	}

	const drag = id !== undefined
	const draggable = drag ? "true" : "false"

	return html`
		<button
			title="${title}"
			?data-active=${active}
			?data-permanent=${!removable}
			@click=${click}
			draggable=${draggable}
			@dragstart=${drag_source_handlers.dragstart}
			@dragend=${drag_source_handlers.dragend}
			@dragover=${drag_destination_handlers.dragover}
			@dragenter=${drag_destination_handlers.dragenter}
			@dragleave=${drag_destination_handlers.dragleave}
			@drop=${drag_destination_handlers.drop}
			>

			<span class=icon>
				${content}
			</span>

			${removable ? html`
				<span
					class=x
					?data-available=${active}>
					${active
						? sprite_x
						: undefined}
				</span>
			` : undefined}
		</button>
	`
}

