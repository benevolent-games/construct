
import {QuickElement} from "@benev/frog"
import {TemplateResult, html} from "lit"

import {styles} from "./styles.css.js"
import {Layout} from "./parts/layout.js"
import {component} from "../frontend.js"
import {alternator} from "./parts/alternator.js"
import {default_layout} from "./parts/default_layout.js"

export const ConstructLayout = component(_ => class extends QuickElement {
	static styles = styles
	#layout = default_layout()

	#sizing_styles(size: number | undefined) {
		return size
			? `flex: 0 0 ${size}%;`
			: `flex: 1 1 100%;`
	}

	#resize_operation: undefined | {
		node: Layout.Cell | Layout.Pane
		vertical: boolean
		initial_size: number
		x: number
		y: number
	}

	#track_movement = (event: MouseEvent) => {
		const resize = this.#resize_operation

		if (resize) {
			let diff = 0
			if (resize.vertical)
				diff = resize.y - event.clientY
			else
				diff = resize.x - event.clientX

			let newsize = resize.initial_size - diff

			newsize = (newsize < 0)
				? 0
				: (newsize > 100)
					? 100
					: newsize

			resize.node.size = newsize
			this.requestUpdate()
			console.log("resize", newsize)
		}
	}

	#end_resize = (event: MouseEvent) => {
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
							(child, _index) => html`
								<div class=resizer @mousedown=${(event: MouseEvent) => {
									this.#resize_operation = {
										node: child,
										vertical: node.vertical,
										initial_size: child.size ?? 50,
										x: event.clientX,
										y: event.clientY,
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

