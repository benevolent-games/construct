
import "@babylonjs/loaders/glTF/index.js"
import "@babylonjs/core/Engines/index.js"
import "@babylonjs/core/Culling/ray.js"
import "@babylonjs/core/Rendering/edgesRenderer.js"

import {Scene} from "@babylonjs/core/scene.js"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
import {Engine} from "@babylonjs/core/Engines/engine.js"
import {Vector3} from "@babylonjs/core/Maths/math.vector.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"
import {Color3, Color4} from "@babylonjs/core/Maths/math.color.js"
import {TargetCamera} from "@babylonjs/core/Cameras/targetCamera.js"
import {PBRMaterial} from "@babylonjs/core/Materials/PBR/pbrMaterial.js"
import {HemisphericLight} from "@babylonjs/core/Lights/hemisphericLight.js"

import {pub} from "@benev/slate"
import {Rand, Vec3, babylonian, loop} from "@benev/toolbox"

export class Babylon {
	canvas = new OffscreenCanvas(160, 90)
	engine = new Engine(this.canvas)
	scene = new Scene(this.engine)

	box: Mesh
	onRender = pub<void>()

	constructor() {
		const {scene} = this

		const fallbackCamera = new TargetCamera(
			"fallbackCamera",
			Vector3.Zero(),
			scene,
		)

		scene.clearColor = new Color4(24 / 255, 24 / 255, 24 / 255, 1)
		scene.addCamera(fallbackCamera)
		spawn_boxes(scene)

		const box = MeshBuilder.CreateBox("box", {size: 1}, scene)
		box.position = new Vector3(0, 3, 3)
		const material = new PBRMaterial("mat", scene)
		material.albedoColor = new Color3(0.9, 0.9, 0.9)
		material.roughness = 0.5
		material.metallic = 0.5
		scene.addMesh(box)

		const light = new HemisphericLight("hemi", new Vector3(0.234, 1, 0.123), scene)
		scene.addLight(light)

		fallbackCamera.setTarget(box.position)
		this.box = box

		this.engine.runRenderLoop(() => {
			this.onRender.publish()
			scene.render()
		})
	}
}

export function spawn_boxes(scene: Scene) {
	const material = new PBRMaterial("material", scene)
	material.albedoColor = new Color3(0.8, 0.8, 0.8)
	material.roughness = 0.5
	material.metallic = 0.5

	const randy = Rand.seed(4)

	function rand() {
		const sign = randy.roll(0.5)
		const coordinate = randy.between(5, 20)
		return sign
			? coordinate
			: -coordinate
	}

	function make_a_random_box() {
		const position: Vec3 = [rand(), rand(), rand()]
		const box = MeshBuilder.CreateBox("box", {size: 2}, scene)
		box.material = material
		box.position = babylonian.from.vec3(position)
	}

	for (const _ of loop(200))
		make_a_random_box()
}

