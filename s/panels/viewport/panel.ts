
import {html} from "@benev/slate"
import {V2, v2} from "@benev/toolbox/x/utils/v2.js"
import {make_fly_camera} from "@benev/toolbox/x/babylon/flycam/make_fly_camera.js"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {PanelProps, panel} from "../panel_parts.js"
import {start_resizing} from "./parts/start_resizing.js"
import {sprite_box} from "../../sprites/groups/feather/box.js"
import { make_outline_tools } from "../../context/domains/outline/tools.js"
import { Matrix, Vector3 } from "@babylonjs/core/Maths/math.js"
import { Ray } from "@babylonjs/core/Culling/ray.js"

let camcount = 0

export const ViewportPanel = panel({
	label: "viewport",
	icon: sprite_box,
	view: slate.obsidian({name: "viewport", styles}, use => ({leafId}: PanelProps) => {
		const {scene, engine} = use.context.babylon
		const {input, actions, world} = use.context

		const {canvas, camera} = use.init(() => {
			const canvas = document.createElement("canvas")
			const axis = (a: boolean, b: boolean) => ((a ?1 :0) - (b ?1 :0))

			const fly = make_fly_camera({scene, position: [0, 0, -50]})
			const {camera} = fly
			const camid = camcount++
			camera.id = `cam_id_${camid}`
			camera.name = `cam_name_${camid}`

			function simulate() {
				if (input.is_leaf_focal(leafId)) {
					const {forward, backward, leftward, rightward} = input.tactic.buttons
					const {up, down, left, right} = input.tactic.buttons

					fly.add_move([
						axis(rightward, leftward),
						axis(forward, backward),
					])

					fly.add_look(v2.multiplyBy([
						axis(right, left),
						axis(up, down),
					], 0.05))
				}
			}

			use.context.renderLoop.add(simulate)
			scene.addCamera(camera)
			const stop_resizing = start_resizing(canvas)
			const view = engine.registerView(canvas, camera)

			return [{view, canvas, camera}, () => {
				use.context.renderLoop.delete(simulate)
				fly.dispose()

				engine.unRegisterView(canvas)
				camera.dispose()
				stop_resizing()
			}]
		})

		use.setup(() => {
			let canvasCoordinates: V2 | null = null

			const disposeMovements = input.pointerMovements.onInput(() => {
				const [clientX, clientY] = input.pointerMovements.coordinates
				const rect = canvas.getBoundingClientRect()
				const canvasX = clientX - rect.left
				const canvasY = clientY - rect.top
				const withinX = (canvasX >= 0) && (canvasX <= rect.width)
				const withinY = (canvasY >= 0) && (canvasY <= rect.height)
				const withinCanvas = withinX && withinY
				canvasCoordinates = withinCanvas
					? [canvasX, canvasY]
					: null
			})

			const disposeButtons = input.tactic.on.buttons.select(inp => {
				if (inp.down && canvasCoordinates) {
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

					const ray = new Ray(near, direction)
					const pick = scene.pickWithRay(ray)

					if (pick && pick.hit && pick.pickedMesh) {
						const id = world.find_id_for_mesh(pick.pickedMesh)
						if (id) {
							const tools = make_outline_tools(use.context.state.outline)
							if (tools.isSelected(id))
								actions.items.deselect(id)
							else
								actions.items.select(id)
						}
					}
					else {
						actions.items.clear_selection()
					}
				}
			})

			return () => {
				disposeMovements()
				disposeButtons()
			}
		})

		function lock(event: MouseEvent) {
			if (!document.pointerLockElement) {
				const container = event.currentTarget as HTMLElement
				container.requestPointerLock()
				input.pointerLock.value = {leafId}
			}
		}

		function contextmenu(event: MouseEvent) {
			event.preventDefault()
			lock(event)
		}

		return html`
			<div class=container @contextmenu="${contextmenu}">
				${canvas}
			</div>
		`
	}),
})

