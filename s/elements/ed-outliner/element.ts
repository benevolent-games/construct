
import {TemplateResult, html} from "lit"
import {QuickElement} from "@benev/frog"
import {Context} from "../../context/context.js"
import {Id} from "../../context/aspects/graph/parts/types.js"
import {Item} from "../../context/aspects/outliner/parts/item.js"

export const EdOutliner = (context: Context) => class extends QuickElement {

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

	#folder(folder: Item.Folder, parent?: Item.Folder) {
		return this.#li(folder.id, html`
			<div>
				<span>${folder.name}</span>
			</div>
			<ol>
				${folder.children.map(item => this.#whatever(item, folder))}
			</ol>
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
			<ol>
				${this.#folder(context.outliner.root)}
			</ol>
		`
	}
}

