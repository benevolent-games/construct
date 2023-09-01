
import {QuickElement} from "@benev/frog"
import {TemplateResult, html} from "lit"

import {size_of_resize_handle_in_rem, styles} from "./styles.css.js"
import {Layout} from "./parts/layout.js"
import {component} from "../frontend.js"
import {alternator} from "./parts/alternator.js"
import {default_layout} from "./parts/default_layout.js"

export function cap(x: number, min: number, max: number) {
	return (x < min)
		? min
		: (x > max)
			? max
			: x
}

export function cap_percent(x: number) {
	return cap(x, 0, 100)
}

export type ResizeOperation = {
	parent: Layout.Cell
	node: Layout.Cell | Layout.Pane
	next: undefined | {
		node: Layout.Cell | Layout.Pane
		initial_size: number | undefined
	}
	initial_size: number
	x: number
	y: number
	width: number
	height: number
}

export function calculate_resize_value(
		resize: ResizeOperation,
		clientX: number,
		clientY: number,
	) {

	let diff = 0

	if (resize.parent.vertical) {
		const pixels = resize.y - clientY
		const percent = (pixels / resize.height) * 100
		diff = percent
	}
	else {
		const pixels = resize.x - clientX
		const percent = (pixels / resize.width) * 100
		diff = percent
	}

	const newsize = cap_percent(resize.initial_size - diff)

	const overboard = (() => {
		const rem_px = parseFloat(
			getComputedStyle(document.documentElement).fontSize
		)

		const handle_size_px = rem_px * size_of_resize_handle_in_rem

		const handle_size_percent = resize.parent.vertical
			? (handle_size_px / resize.height) * 100
			: (handle_size_px / resize.width) * 100

		const number_of_resize_handles = resize.parent.children.length < 2
			? 0
			: resize.parent.children.length - 1

		const siblingpercent = resize.parent.children
			.filter(node => node !== resize.node)
			.reduce((sum, node) => sum + (node.size ?? 0), 0)

		const resizingpercent = (number_of_resize_handles * handle_size_percent)

		const totalpercent = newsize + siblingpercent + resizingpercent

		return (totalpercent > 100)
			? totalpercent - 100
			: 0
	})()

	return newsize - overboard
}

export function apply_relevant_sizing_to_next_sibling(
		resize: ResizeOperation,
		new_size_of_current_cell: number,
	) {

	if (
			resize.next &&
			resize.next.initial_size !== undefined &&
			resize.next.node.size !== undefined
		) {

		resize.next.node.size = cap_percent(
			resize.next.initial_size + (resize.initial_size - new_size_of_current_cell)
		)
	}
}

export function get_values_for_next_cell(resize: ResizeOperation) {
	if (
		resize.next &&
		resize.next.initial_size !== undefined &&
		resize.next.node.size !== undefined
	) {
		return {
			initial_size: resize.next.initial_size,
			size: resize.next.node.size,
		}
	}
}


export const ConstructLayout = component(_ => class extends QuickElement {
	static styles = styles

	#layout = default_layout()

	#sizing_styles(size: number | undefined) {
		return size !== undefined
			? `flex: 0 0 ${size}%;`
			: `flex: 1 1 auto;`
	}

	#resize_operation: undefined | ResizeOperation

	#track_movement = ({clientX, clientY}: MouseEvent) => {
		const resize = this.#resize_operation

		if (resize) {
			const newSize = calculate_resize_value(resize, clientX, clientY)
			resize.node.size = newSize

			apply_relevant_sizing_to_next_sibling(resize, newSize)

			this.requestUpdate()
		}
	}

	#end_resize = () => {
		this.#resize_operation = undefined
	}

	#render_layout(node: Layout.Node, path: number[] = []): TemplateResult | void {
		switch (node.kind) {

			case "cell": {
				return html`
					<div
						class=cell
						?data-vertical=${node.vertical}
						style="${this.#sizing_styles(node.size)}">

						${alternator(
							node.children,
							(child, index) => (
								this.#render_layout(child,[...path, index])
							),
							(child, index) => html`
								<div class=resizer @mousedown=${(event: MouseEvent) => {
									const target = event.target as HTMLElement
									const rect = target.parentElement!.getBoundingClientRect()
									const next = node.children.at(index + 1)
									this.#resize_operation = {
										node: child,
										parent: node,
										initial_size: child.size ?? 50,
										next: next
											? {node: next, initial_size: next.size}
											: undefined,
										x: event.clientX,
										y: event.clientY,
										width: rect.width,
										height: rect.height,
									}
								}}></div>
							`,
						)}
					</div>
				`
			}

			case "pane": {
				return html`
					<div
						class=pane
						style="${this.#sizing_styles(node.size)}">

						${node.children.map(
							(leaf, index) => (
								this.#render_layout(leaf, [...path, index])
							)
						)}
					</div>
				`
			}

			case "leaf": {
				return html`
					<div class=leaf>
						<slot name="${`leaf-${path.join('-')}`}"></slot>
					</div>
				`
			}
		}
	}

	render() {
		return html`
			<div
				class=layout
				@mousemove=${this.#track_movement}
				@mouseup=${this.#end_resize}>

				${this.#render_layout(this.#layout)}
			</div>
		`
	}
})

