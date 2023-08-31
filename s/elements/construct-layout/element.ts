
import {QuickElement} from "@benev/frog"
import {TemplateResult, html} from "lit"

import {styles} from "./styles.css.js"
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

export const ConstructLayout = component(_ => class extends QuickElement {
	static styles = styles
	#layout = default_layout()

	#sizing_styles(size: number | undefined) {
		return size !== undefined
			? `flex: 0 0 ${size}%;`
			: `flex: 1 1 100%;`
	}

	#resize_operation: undefined | {
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

	#track_movement = (event: MouseEvent) => {
		const resize = this.#resize_operation

		if (resize) {
			let diff = 0

			if (resize.parent.vertical) {
				const pixels = resize.y - event.clientY
				const percent = (pixels / resize.height) * 100
				diff = percent
			}
			else {
				const pixels = resize.x - event.clientX
				const percent = (pixels / resize.width) * 100
				diff = percent
			}

			const newsize = cap(resize.initial_size - diff, 0, 100)
			resize.node.size = newsize

			if (resize.next) {
				if (resize.next.initial_size !== undefined && resize.next.node.size !== undefined) {
					const nsize = cap(resize.next.initial_size + diff, 0, 100)
					resize.next.node.size = nsize
				}
			}

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

