
import {Scene} from "@babylonjs/core/scene.js"
import {V3, v3} from "@benev/toolbox/x/utils/v3.js"
import {Color3} from "@babylonjs/core/Maths/math.color.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"
import {PBRMaterial} from "@babylonjs/core/Materials/PBR/pbrMaterial.js"

export function make_box(scene: Scene) {
	const material = new PBRMaterial("material", scene)
	material.albedoColor = new Color3(0.8, 0.8, 0.8)
	material.roughness = 0.5
	material.metallic = 0.5

	const position: V3 = [0, 0, 10]
	const box = MeshBuilder.CreateBox("box", {size: 2}, scene)
	box.material = material
	box.position = v3.toBabylon(position)

	return box
}
