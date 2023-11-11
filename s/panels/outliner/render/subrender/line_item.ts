
import {TemplateResult, html} from "@benev/slate"

import {ItemMeta} from "../../utils/metas.js"
import {delete_item} from "../../behaviors/delete_item.js"
import {icon_feather_x} from "../../../../icons/groups/feather/x.js"

export function render_line_item(meta: ItemMeta, content: TemplateResult) {
	const {item, parents, isRoot, tools, drops} = meta
	const itemId = item.id
	const {dnd} = drops
	const hovering = drops.make_hovering_data(item.id)
	const isApparent = tools.isApparent(item.id)

	const is_deleteable = !isRoot

	const is_hovering_over = dnd.hovering && (
		dnd.hovering.mode === "into"
			? dnd.hovering.folderId === itemId
			: dnd.hovering.itemId === itemId
	)

	return html`
		<li
			data-id="${item.id}"
			data-kind="${item.kind}"
			?data-visible="${item.visible}"
			?data-not-apparent="${!isApparent}"
			?data-selected="${item.selected}"
			@dragleave=${dnd.dropzone.dragleave()}>

			${dnd.grabbed ?html`
				<div class=dropzone
					?data-drag-hover="${is_hovering_over}"
					data-drag-mode="${dnd.hovering?.mode}">
					${item.kind === "folder" ? html`
						<div
							class=drop-into
							@dragover=${dnd.dropzone.dragover(hovering.into)}
							@drop=${dnd.dropzone.drop(hovering.into)}
						></div>
					` : undefined}
					${!isRoot ? html`
						<div
							class=drop-below
							@dragover=${dnd.dropzone.dragover(hovering.below)}
							@drop=${dnd.dropzone.drop(hovering.below)}
						></div>
					` : undefined}
				</div>
			` :undefined}

			<div class=gutter-group>
				${parents.map(() => html`
					<span class=gutter></span>
				`)}
			</div>

			${content}

			${is_deleteable
				? html`
					<button class=delete @click=${() => delete_item(meta)}>
						${icon_feather_x}
					</button>
				`
				: html`
					<div class=spacer></div>
				`}
		</li>
	`
}

