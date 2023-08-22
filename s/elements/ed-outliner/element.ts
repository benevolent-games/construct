
import {TemplateResult, html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"
import eyeOpenSvg from "../../icons/akar/eye-open.svg.js"
import arrowDownSvg from "../../icons/akar/arrow-down.svg.js"
import eyeSlashedSvg from "../../icons/akar/eye-slashed.svg.js"
import {Id} from "../../context/controllers/graph/parts/types.js"
import {Item} from "../../context/controllers/outliner/parts/item.js"
import folderSvg from "../../icons/material-design-icons/folder.svg.js"
import deleteBinSvg from "../../icons/material-design-icons/delete-bin.svg.js"

export const EdOutliner = ({outliner}: Context) => class extends QuickElement {

	static styles = style

	#whatever(item: Item.Whatever, parent: Item.Folder): TemplateResult {
		switch (item.kind) {
			case "folder":
				return this.#folder(item, parent)
			case "prop":
				return this.#prop(item, parent)
			case "light":
				return this.#light(item, parent)
		}
	}

	#li(id: Id, content: TemplateResult) {
		return html`
			<li data-id="${id}">
				${content}
			</li>
		`
	}

	#toggle_folder_opened_attribute(e: PointerEvent) {
		const folder = (e.target as HTMLElement).closest(".folder")
		folder?.toggleAttribute("data-opened")
	}

	#folder(folder: Item.Folder, parent?: Item.Folder) {
		return this.#li(folder.id, html`
			<div class=folder>
				<div
					class="folder-header"
					?data-notvisible=${!folder.isVisible}
				>
					${folderSvg}
					<span>${folder.name}</span>
						<span class="open-folder" @pointerdown=${this.#toggle_folder_opened_attribute}>
							${arrowDownSvg}
						</span>
						<span class="add-folder" @click=${() => outliner.add(folder, {
							kind: "folder",
							name: "New Folder",
							children: [],
							isVisible: true
						})}>
							+
						</span>
						<span ?isVisible=${folder.isVisible} @click=${() => outliner.set_visibility(folder)} class="toggle-visibility">
							${folder.isVisible ? eyeOpenSvg : eyeSlashedSvg}
						</span>
						<span @pointerdown=${() => outliner.remove(parent!, folder.id)} class="delete-folder">
							${parent ? deleteBinSvg : null}
						</span>
				</div>
				<ol>
					${folder.children.map(item => this.#whatever(item, folder))}
				</ol>
			</div>
		`)
	}

	#prop(prop: Item.Prop, parent: Item.Folder) {
		return this.#li(prop.id, html``)
	}

	#light(light: Item.Light, parent: Item.Folder) {
		return this.#li(light.id, html``)
	}

	render() {
		return html`
			<ol class=folders>
				${this.#folder(outliner.root)}
			</ol>
		`
	}
}

