import {Publish, Thing} from "../components/types.js"

export class Folder {
	name = "folder"
	folders: Folder[] = []
	originals: Thing[] = []
	instances: Thing[] = []

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

	add_object(object: Thing) {
		this.instances = [...this.instances, object]
	}

	delete_object(object: Thing) {
		const filtered = this.instances.filter(instance => instance !== object)
		this.instances = filtered
	}
}
