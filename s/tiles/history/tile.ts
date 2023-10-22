
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {sprite_history} from "../../sprites/groups/akar/history.js"
import {sprite_rewind} from "../../sprites/groups/feather/rewind.js"
import {Action} from "../../context/controllers/graphliner/parts/types.js"
import {sprite_fast_forward} from "../../sprites/groups/feather/fast-forward.js"

export const HistoryTile = tile({
	label: "history",
	icon: sprite_history,
	view: obsidian({name: "history", styles}, use => () => {
		const {basis} = use.context
		const {future, past} = use.watch(() => basis.history)

		function render_action(timeline: "future" | "past") {
			return (action: Action.Unknown) => html`
				<li data-id="${action.id}" data-timeline="${timeline}">
					<span>${action.id}</span>
					<span>${action.label}</span>
				</li>
			`
		}

		return html`
			<h1>
				<button class=based @click=${() => basis.undo()}>
					${sprite_rewind}
					<span>undo</span>
				</button>
				<span>history</span>
				<button class=based @click=${() => basis.redo()}>
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

