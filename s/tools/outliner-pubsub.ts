import {Thing} from "../components/types.js"

export class OutlinerPubsub {
	subscribers: Array<() => void> = []
	
	subscribe(callback: () => void) {
		this.subscribers.push(callback)
	}

	updateOutliner() {
		this.subscribers.forEach(callback => callback())
	}
}

export class Folder {
	pubsub: OutlinerPubsub | null = null
	name = "folder"
	folders: Folder[] = []
	things: Thing[] = [{name: "thing", id: "1", mesh: undefined}]

	add_folder(pubsub: OutlinerPubsub) {
		if (!this.pubsub) {this.pubsub = pubsub}
		this.folders.push(new Folder())
		if (this.pubsub)
			this.pubsub.updateOutliner()
	}
}
