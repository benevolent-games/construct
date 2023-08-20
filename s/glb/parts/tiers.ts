
import sharp from "sharp"
import {Transform} from "@gltf-transform/core"
import {textureCompress} from "@gltf-transform/functions"

import {std_transforms} from "./std_transforms.js"
import {delete_meshes} from "./custom_transforms.js"

export const tiers = [

	["fancy", [
		textureCompress({
			encoder: sharp,
			targetFormat: "webp",
			resize: [1024, 1024],
			quality: 80,
		}),
		...std_transforms,
	]],

	["mid", [
		textureCompress({
			encoder: sharp,
			targetFormat: "webp",
			resize: [512, 512],
			quality: 60,
		}),
		delete_meshes("#0"),
		...std_transforms,
	]],

	["potato", [
		textureCompress({
			encoder: sharp,
			targetFormat: "webp",
			resize: [256, 256],
			quality: 50,
		}),
		delete_meshes("#0", "#1"),
		...std_transforms,
	]],

] satisfies [string, Transform[]][]

