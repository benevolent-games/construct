
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {Action} from "../../context/framework/action_namespace.js"
import {sprite_history} from "../../sprites/groups/akar/history.js"
import {sprite_rewind} from "../../sprites/groups/feather/rewind.js"
import {sprite_fast_forward} from "../../sprites/groups/feather/fast-forward.js"
import { human_time } from "../../tools/human_time.js"

export const HistoryTile = tile({
	label: "history",
	icon: sprite_history,
	view: obsidian({name: "history", styles}, use => () => {

		const history = use.context.history
		const {past, future} = use.watch(() => history.annals)

		use.setup(() => {
			const interval = setInterval(() => use.rerender(), 1000)
			return () => clearInterval(interval)
		})

		function render_action(timeline: "future" | "past") {
			return (action: Action.Base) => html`
				<li data-id="${action.id}" data-timeline="${timeline}">
					<span class=id>#${action.id.toString().padStart(5, "0")}</span>
					<span class=purpose>${action.purpose}</span>
					<span class=time>${human_time(Date.now() - action.time)} ago</span>
				</li>
			`
		}

		return html`
			<div class=buttons>
				<button class=based @click=${() => history.undo()}>
					${sprite_rewind}
					<span>undo</span>
				</button>
				<button class=based @click=${() => history.redo()}>
					<span>redo</span>
					${sprite_fast_forward}
				</button>
			</div>
			<ol class=chronicles>
				${future.map(render_action("future"))}
				${[...past].reverse().map(render_action("past"))}
			</ol>
		`
	}),
})

