
import {LitElement, html} from "lit"
import {mixinContextRequirement, mixinCss} from "@chasemoskal/magical"

import {style} from "./style.js"
import {Context} from "../context.js"
import {OutlinerPubsub} from "../../tools/outliner-pubsub.js"
import {recursively_load_folders} from "./utils/recursively_load_folders.js"

@mixinCss(style)
export class EditOutliner extends mixinContextRequirement<Context>()(LitElement) {
	outlinerPubSub: OutlinerPubsub

	constructor() {
		super()
		this.outlinerPubSub = new OutlinerPubsub()
	}

	connectedCallback() {
		super.connectedCallback()
		this.outlinerPubSub.subscribe(() => {
			this.requestUpdate()
		})
	}

	render() {
		const world = this.context.world.state
		const {root_folder} = this.context.folders.state

		return html`
		<h1>Outliner</h1>
			<div class=folders>
				<div class=root-folder>
					<div class=root-folder-header>
						<p>${root_folder.name}</p>
							<span @pointerdown=${(e: PointerEvent) => {
								const rootFolder = (e.target as HTMLElement).closest(".root-folder")
								rootFolder?.toggleAttribute("data-opened")
								}}>-
							</span>
							<span @pointerdown=${() => root_folder.add_folder(this.outlinerPubSub)}>+</span>
						</div>
					<div class=folder-objects>
						${root_folder.things.map(thing => html`
							<p>${thing.name}</p>
						`)}
					</div>
					${recursively_load_folders(root_folder.folders, this.outlinerPubSub)}
				</div>
			</div>
		`
	}
}
