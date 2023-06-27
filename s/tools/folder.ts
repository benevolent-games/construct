import {Publish, Thing} from "../components/types.js"

export class Folder {
	name = "folder"
	folders: Folder[] = []
	things: Thing[] = [{name: "thing", id: "1", mesh: undefined}]

	delete_folder(sourceFolder: Folder) {
		const filtered = this.folders.filter(folder => folder !== sourceFolder)
		this.folders = filtered
	}

	create_folder(folder: Folder, publish: Publish) {
		folder.folders = [...this.folders, new Folder()]
		publish()
	}

	add_folder(folder: Folder) {
		this.folders = [...this.folders, folder]
	}
}
