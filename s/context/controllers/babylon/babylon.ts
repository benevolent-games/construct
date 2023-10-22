
import "@babylonjs/loaders/glTF/index.js"
import "@babylonjs/core/Engines/index.js"

import {Scene} from "@babylonjs/core/scene.js"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
import {Engine} from "@babylonjs/core/Engines/engine.js"
import {Vector3} from "@babylonjs/core/Maths/math.vector.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"
import {Color3, Color4} from "@babylonjs/core/Maths/math.color.js"
import {TargetCamera} from "@babylonjs/core/Cameras/targetCamera.js"
import {PBRMaterial} from "@babylonjs/core/Materials/PBR/pbrMaterial.js"
import {HemisphericLight} from "@babylonjs/core/Lights/hemisphericLight.js"

export class Babylon {
	canvas = new OffscreenCanvas(160, 90)
	engine = new Engine(this.canvas)
	scene = new Scene(this.engine)

	box: Mesh

	constructor() {
		const {scene} = this

		const fallbackCamera = new TargetCamera(
			"fallbackCamera",
			Vector3.Zero(),
			scene,
		)

		scene.clearColor = new Color4(0, 0, 0, 0)
		scene.addCamera(fallbackCamera)

		const box = MeshBuilder.CreateBox("box", {size: 1}, scene)
		box.position = new Vector3(0, 3, 3)
		const material = new PBRMaterial("mat", scene)
		material.albedoColor = new Color3(0.9, 0.9, 0.9)
		material.roughness = 0.5
		material.metallic = 0.5
		scene.addMesh(box)

		const light = new HemisphericLight("hemi", new Vector3(-1.23, -0.789, -1.618), scene)
		scene.addLight(light)

		fallbackCamera.setTarget(box.position)
		this.box = box
	}
}

