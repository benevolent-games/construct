
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {PanelProps, panel} from "../panel_parts.js"
import {human_time} from "../../tools/human_time.js"
import {Action} from "../../context/framework/action_namespace.js"
import {sprite_akar_history} from "../../sprites/groups/akar/history.js"
import {sprite_feather_rewind} from "../../sprites/groups/feather/rewind.js"
import {sprite_feather_fast_forward} from "../../sprites/groups/feather/fast-forward.js"

export const HistoryPanel = panel({
	label: "history",
	icon: sprite_akar_history,
	view: slate.obsidian({name: "history", styles}, use => ({}: PanelProps) => {

		const {history} = use.context.tree
		const {past, future} = use.watch(() => history.annals)

		use.setup(() => {
			const interval = setInterval(() => use.rerender(), 1000)
			return () => clearInterval(interval)
		})

		function render_action(timeline: "future" | "past") {
			return (action: Action.Base) => html`
				<li data-id="${action.id}" data-timeline="${timeline}">
					<span class=purpose>${action.purpose.join(".")}</span>
					<span class=id>#${action.id}</span>
					<span class=time>${human_time(Date.now() - action.time)} ago</span>
				</li>
			`
		}

		return html`
			<div class=buttons>
				<button class=based @click=${() => history.undo()}>
					${sprite_feather_rewind}
					<span>undo</span>
				</button>
				<button class=based @click=${() => history.redo()}>
					<span>redo</span>
					${sprite_feather_fast_forward}
				</button>
			</div>
			<ol class=chronicles>
				${future.map(render_action("future"))}
				${[...past].reverse().map(render_action("past"))}
			</ol>
		`
	}),
})

