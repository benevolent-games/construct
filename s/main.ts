
import "@benev/toolbox/x/html.js"

import "@babylonjs/loaders/glTF/index.js"
import {AssetContainer} from "@babylonjs/core/assetContainer.js"
import {SceneLoader} from "@babylonjs/core/Loading/sceneLoader.js"
import {BenevTheater} from "@benev/toolbox/x/babylon/theater/element.js"

const theater = document.querySelector<BenevTheater>("benev-theater")!
await (theater.updateComplete)

theater.babylon.stop()

function evently(element: HTMLElement) {
	return (...events: string[]) => <E extends Event>(fun: (event: E) => void) => {
		for (const name of events)
			element.addEventListener(name, fun as any)
		return () => {
			for (const name of events)
				element.removeEventListener(name, fun as any)
		}
	}
}

function prevent_defaults(e: Event) {
	e.preventDefault()
	e.stopPropagation()
}

function contains(parent: Node, child: Node): boolean {
	let node: Node | null = child

	while (node) {
		if (node === parent)
			return true

		if (node.parentNode)
			node = node.parentNode

		else if ((node as ShadowRoot).host)
			node = (node as ShadowRoot).host

		else
			return false
	}

	return false
}

function drag_and_drop(
		element: HTMLElement,
		handle_drop: (list: FileList) => void,
	) {

	function highlight() {
		element.setAttribute("data-drop-highlight", "")
	}

	function unhighlight(event: DragEvent) {
		if (!contains(element, event.relatedTarget as Node))
			element.removeAttribute("data-drop-highlight")
	}

	const on = evently(element)

	on("dragenter", "dragover", "dragleave", "drop")
		(prevent_defaults)

	on("dragenter", "dragover")
		(highlight)

	on("dragleave", "drop")
		(unhighlight)

	on("drop")<DragEvent>(({dataTransfer}) => {
		if (dataTransfer)
			handle_drop(dataTransfer.files)
	})
}

drag_and_drop(document.documentElement, async list => {
	const scene = theater.babylon.scene
	const containers: AssetContainer[] = []

	for (const file of Array.from(list)) {
		console.log(file)
		const url = URL.createObjectURL(file)
		const container = await SceneLoader.LoadAssetContainerAsync(
			url,
			undefined,
			scene,
			() => {},
			".glb",
		)
		containers.push(container)
	}

	console.log({containers})
})






console.log("🎨")

