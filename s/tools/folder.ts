import {Publish, Object} from "../components/types.js"

export class Folder {
	name = "folder"
	folders: Folder[] = []
	originals: Object[] = []
	instances: Object[] = []

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

	add_object(object: Object) {
		this.instances = [...this.instances, object]
	}

	delete_object_from_scene(object: Object) {
		const objectExistInThisFolder = this.instances.find(instance => instance === object)
		if (objectExistInThisFolder) 
			this.instances = this.instances.filter(instance => instance !== object)
		else this.folders.forEach(folder => folder.delete_object_from_scene(object))
	}

	delete_object_from_outliner(object: Object) {
		const filtered = this.instances.filter(instance => instance !== object)
		this.instances = filtered
	}
}
