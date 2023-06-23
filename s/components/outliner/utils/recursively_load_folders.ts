import {html, TemplateResult} from "lit"
import {Folder, OutlinerPubsub} from "../../../tools/outliner-pubsub.js"

export function recursively_load_folders(folders: Folder[], pubsub: OutlinerPubsub): TemplateResult[] {
	return folders.map(folder => html`
		<div class="folder">
			<div class=folder-header>
				<p>${folder.name}</p>
				<span @pointerdown=${(e: PointerEvent) => {
					const rootFolder = (e.target as HTMLElement).closest(".folder")
					rootFolder?.toggleAttribute("data-opened")
					}}>-
				</span>
				<span @pointerdown=${() => folder.add_folder(pubsub)}>+</span>
			</div>
			<div class=folder-objects>
				${folder?.things?.map(thing => html`
				<p>${thing.name}</p>
				`)}d 
			</div>
			${recursively_load_folders(folder?.folders, pubsub)}
	</div>
	`)
}
