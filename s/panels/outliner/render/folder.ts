
import {TemplateResult, html} from "@benev/slate"

import {ItemMeta} from "../utils/metas.js"
import {render_id} from "./subrender/id.js"
import {render_gripbox} from "./subrender/gripbox.js"
import {render_line_item} from "./subrender/line_item.js"
import {render_visibility} from "./subrender/visibility.js"
import {Item} from "../../../context/domains/outline/types.js"
import {create_new_folder} from "../behaviors/create_new_folder.js"
import {OutlinerBehaviors} from "../utils/make_outliner_behaviors.js"
import {icon_tabler_folder_open} from "../../../icons/groups/tabler/folder-open.js"
import {icon_tabler_folder_plus} from "../../../icons/groups/tabler/folder-plus.js"
import {icon_tabler_folder_filled} from "../../../icons/groups/tabler/folder-filled.js"

export function render_folder(
		meta: ItemMeta,
		behaviors: OutlinerBehaviors,
		renderChild: (child: Item.Whatever) => TemplateResult,
	) {

	const select = behaviors.click_for_item_selections(meta)

	const {folderStates, outline} = meta
	const item = meta.item as Item.Folder
	const reports = outline.reports

	const folderState = folderStates.obtain(item.id)

	const toggle_opened = () => {
		folderState.opened = !folderState.opened
	}

	const number_of_children = reports.reduce(
		(previous, current) =>
			previous + (current.parents.map(p => p.id)
				.includes(item.id) ? 1 : 0), 0
	)

	return html`
		${render_line_item(meta, html`
			${render_gripbox(meta, html`
				<button @pointerdown=${toggle_opened}>
					${folderState.opened
						? icon_tabler_folder_open
						: icon_tabler_folder_filled}
				</button>
				<div
					class=name
					@click=${select}>
						${item.name}
				</div>
			`)}

			<div
				class=childcount
				data-unnecessary
				@click=${select}>
					${number_of_children}
			</div>

			${render_id(meta, toggle_opened)}

			<button
				class=newfolder
				@pointerdown=${() => create_new_folder(meta, item)}>
					${icon_tabler_folder_plus}
			</button>

			${render_visibility(meta)}
		`)}

		${folderState.opened
			? item.children.map(renderChild)
			: undefined}
	`
}

