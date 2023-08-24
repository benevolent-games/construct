
import {TemplateResult, html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"
import eyeOpenSvg from "../../icons/akar/eye-open.svg.js"
import {setupListener} from "../../utils/setup-listener.js"
import arrowDownSvg from "../../icons/akar/arrow-down.svg.js"
import eyeSlashedSvg from "../../icons/akar/eye-slashed.svg.js"
import {Id} from "../../context/controllers/graph/parts/types.js"
import {Item} from "../../context/controllers/outliner/parts/item.js"
import objectSvg from "../../icons/material-design-icons/object.svg.js"
import folderSvg from "../../icons/material-design-icons/folder.svg.js"
import deleteBinSvg from "../../icons/material-design-icons/delete-bin.svg.js"
import { svg } from "lit"
export const EdOutliner = ({outliner, flat}: Context) => class extends QuickElement {

	#state = flat.state({
		item_rename_stared_on: "",
		new_name: ""
	})

	static styles = style

	connectedCallback() {
		super.connectedCallback()
		setupListener(window, "click", (e: PointerEvent) => {
			const input = e.composedPath().find((element) =>
				(element as HTMLInputElement).className === "input-rename")
			if(!input)
				this.#state.item_rename_stared_on = ""
		})
	}

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

	#render_item_name(item: Item.Whatever, icon: TemplateResult) {
		return html`
			${icon}
			${this.#state.item_rename_stared_on === item.id
				? html`
					<input
						@input=${(e: InputEvent) => this.#state.new_name = (e.target as HTMLInputElement).value}
						class="input-rename"
						value=${item.kind !== "prop" ? item.name : item.id}>`
				: html`
					<span @dblclick=${() => this.#state.item_rename_stared_on = item.id}>
						${item.kind !== "prop" ? item.name : item.id}
					</span>`
			}
		`
	}

	#render_common_icons(item: Item.Whatever, parent?: Item.Folder) {
		return html`
			<span ?isVisible=${item.isVisible} @click=${() => outliner.set_visibility(item)} class="toggle-visibility">
				${item.isVisible ? eyeOpenSvg : eyeSlashedSvg}
			</span>
			<span @pointerdown=${() => outliner.remove(item.id)} class="delete-folder">
				${parent ? deleteBinSvg : null}
			</span>
		`
	}

	#render_add_folder_icon(folder: Item.Folder) {
		return html`
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
		`
	}

	#toggle_folder_opened_attribute(e: PointerEvent) {
		const folder = (e.target as HTMLElement).closest(".folder")
		folder?.toggleAttribute("data-opened")
	}

	#drag_drop(name: TemplateResult, icons: TemplateResult, div_class: string, item: Item.Whatever) {
		return html`
			<div
				?data-notvisible=${!item.isVisible}
				class="${div_class}"
				draggable=true
				@dragend=${() => console.log("drag end")}
				@dragstart=${() => console.log("drag start")}
				@dragover=${(e: DragEvent) => e.preventDefault()}>
				<div class=item-name>${name}</div>
				<div class=icons>${icons}</div>
			</div>
		`
	}

	#folder(folder: Item.Folder, parent?: Item.Folder) {
		return this.#li(folder.id, html`
			<div data-opened class=folder>
				${this.#drag_drop(
					this.#render_item_name(folder, folderSvg),
					html`
						${this.#render_add_folder_icon(folder)}
						${this.#render_common_icons(folder, parent)}
					`,
				"folder-header",
				folder
				)}
				<ol>
					${folder.children.map(item => this.#whatever(item, folder))}
				</ol>
			</div>
		`)
	}

	#prop(prop: Item.Prop, parent: Item.Folder) {
		return this.#li(prop.id,
			this.#drag_drop(
				this.#render_item_name(prop, objectSvg),
				this.#render_common_icons(prop, parent),
				"item",
				prop
			)
		)
	}

	#light(light: Item.Light, parent: Item.Folder) {
		return this.#li(light.id,
			this.#drag_drop(
				this.#render_item_name(light, objectSvg),
				this.#render_common_icons(light, parent),
				"item",
				light
			)
		)
	}

	render() {
		return html`
			<ol class=folders>
				${this.#folder(outliner.root)}
			</ol>
		`
	}
}

