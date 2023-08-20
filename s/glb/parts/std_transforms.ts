
import {Transform} from "@gltf-transform/core"
import {prune, dedup, draco} from "@gltf-transform/functions"

export const std_transforms = [
	dedup(),
	prune(),
	draco(),
] satisfies Transform[]

