
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {Action} from "../../context/framework/action_namespace.js"
import {sprite_history} from "../../sprites/groups/akar/history.js"
import {sprite_rewind} from "../../sprites/groups/feather/rewind.js"
import {sprite_fast_forward} from "../../sprites/groups/feather/fast-forward.js"

export const HistoryTile = tile({
	label: "history",
	icon: sprite_history,
	view: obsidian({name: "history", styles}, use => () => {

		const history = use.context.history
		const {past, future} = use.watch(() => history.annals)

		function render_action(timeline: "future" | "past") {
			return (action: Action.Base) => html`
				<li data-id="${action.id}" data-timeline="${timeline}">
					<span>${action.id}</span>
					<span>${action.purpose}</span>
				</li>
			`
		}

		return html`
			<h1>
				<button class=based @click=${() => history.undo()}>
					${sprite_rewind}
					<span>undo</span>
				</button>
				<span>history</span>
				<button class=based @click=${() => history.redo()}>
					<span>redo</span>
					${sprite_fast_forward}
				</button>
			</h1>
			<ol class=chronicles>
				${future.map(render_action("future"))}
				${[...past].reverse().map(render_action("past"))}
			</ol>
		`
	}),
})

