import {Folder} from "../../types.js"
import {html, TemplateResult} from "lit"

export function recursively_load_folders(folders: Folder[]): TemplateResult[] {
	return folders.map(folder => html`
		<div class="folder">
			<div class=folder-header>
				<p>${folder.name}</p>
				<span @pointerdown=${(e: PointerEvent) => {
					const rootFolder = (e.target as HTMLElement).closest(".folder")
					rootFolder?.toggleAttribute("data-opened")
					}}>+
				</span>
			</div>
			<div class=folder-objects>
				${folder.things.map(thing => html`
				<p>${thing.name}</p>
				`)}
			</div>
			${recursively_load_folders(folder.folders)}
	</div>
	`)
}
