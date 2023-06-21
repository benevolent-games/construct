
import {LitElement, html} from "lit"
import {mixinContextRequirement, mixinCss} from "@chasemoskal/magical"

import {style} from "./style.js"
import {Context} from "../context.js"
import {recursively_load_folders} from "./utils/recursively_load_folders.js"

@mixinCss(style)
export class EditOutliner extends mixinContextRequirement<Context>()(LitElement) {

	render() {
		const world = this.context.world.state
		const {root_folder} = this.context.folders.state

		return html`
			<div class=folders>
				<div class=root-folder>
					<div class=root-folder-header>
						<p>${root_folder.name}</p>
						<span @pointerdown=${(e: PointerEvent) => {
							const rootFolder = (e.target as HTMLElement).closest(".root-folder")
							rootFolder?.toggleAttribute("data-opened")
							}}>+
						</span>
					</div>
					<div class=folder-objects>
						${root_folder.things.map(thing => html`
							<p>${thing.name}</p>
						`)}
					</div>
					${recursively_load_folders(root_folder.folders)}
				</div>
			</div>
		`
	}
}

