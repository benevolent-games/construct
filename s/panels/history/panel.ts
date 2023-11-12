
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {PanelProps, panel} from "../panel_parts.js"
import {human_time} from "../../tools/human_time.js"
import {icon_akar_history} from "../../icons/groups/akar/history.js"
import {HistoryAction} from "../../context/framework/history_action.js"
import {icon_feather_rewind} from "../../icons/groups/feather/rewind.js"
import {icon_feather_fast_forward} from "../../icons/groups/feather/fast-forward.js"

export const HistoryPanel = panel({
	label: "history",
	icon: icon_akar_history,
	view: slate.obsidian({name: "history", styles}, use => ({}: PanelProps) => {

		const {history} = use.context.tree
		const {past, future} = use.watch(() => history.annals)

		const modeEnabled = use.context.gesture.modes.isEnabled("history")
		const {enabled, undo, redo} = modeEnabled
			? {
				enabled: true,
				undo: () => history.undo(),
				redo: () => history.redo(),
			}
			: {
				enabled: false,
				undo: () => {},
				redo: () => {},
			}

		use.setup(() => {
			const interval = setInterval(() => use.rerender(), 1000)
			return () => clearInterval(interval)
		})

		function render_action(timeline: "future" | "past") {
			return (action: HistoryAction.Record) => html`
				<li data-id="${action.id}" data-timeline="${timeline}">
					<span class=purpose>${action.purpose.join(".")}</span>
					<span class=id>#${action.id}</span>
					<span class=time>${human_time(Date.now() - action.time)} ago</span>
				</li>
			`
		}

		return html`
			<div class=buttons>
				<button class=based ?disabled=${!enabled} @click=${undo}>
					${icon_feather_rewind}
					<span>undo</span>
				</button>
				<button class=based ?disabled=${!enabled} @click=${redo}>
					<span>redo</span>
					${icon_feather_fast_forward}
				</button>
			</div>
			<ol class=chronicles>
				${future.map(render_action("future"))}
				${[...past].reverse().map(render_action("past"))}
			</ol>
		`
	}),
})

