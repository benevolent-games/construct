
import {Document} from "@gltf-transform/core"

export function delete_meshes(...lods: string[]) {
	return (document: Document) => {
		for (const node of document.getRoot().listNodes()) {
			const name = node.getName()
			if (lods.some(lod => name.includes(lod)))
				node.dispose()
		}
	}
}

