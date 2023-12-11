
import {Vec2} from "@benev/toolbox"
import {Ray} from "@babylonjs/core/Culling/ray.js"
import {Camera} from "@babylonjs/core/Cameras/camera.js"
import {Matrix, Vector3} from "@babylonjs/core/Maths/math.vector.js"

export function ray_for_picking_on_canvas(
		camera: Camera,
		canvas: HTMLCanvasElement,
		canvasCoordinates: Vec2,
	) {

	const [x, y] = canvasCoordinates
	const rect = canvas.getBoundingClientRect()
	const normalized_x = (2 * x) / rect.width - 1
	const normalized_y = 1 - (2 * y) / rect.height

	const inverseViewProj = Matrix.Invert(
		camera.getViewMatrix().multiply(camera.getProjectionMatrix())
	)

	const near = Vector3.TransformCoordinates(
		new Vector3(normalized_x, normalized_y, -1),
		inverseViewProj
	)

	const far = Vector3.TransformCoordinates(
		new Vector3(normalized_x, normalized_y, 1),
		inverseViewProj
	)

	const direction = far.subtract(near)
	direction.normalize()

	return new Ray(near, direction)
}

