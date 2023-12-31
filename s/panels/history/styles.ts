
import {css} from "@benev/slate"
import {standard_panel_styles} from "../standard_panel_styles.js"

export const styles = css`

${standard_panel_styles}

:host {
	overflow-y: auto;
}

.buttons {
	width: 100%;
	display: flex;
	flex-direction: row;
	font-size: 1em;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	gap: 0.5em;

	> button {
		display: flex;
		flex-direction: row;
		align-items: center;

		> svg {
			width: 1.5em;
			height: 1.5em;
		}
	}
}

.chronicles {
	font-size: 0.8em;

	display: flex;
	flex-direction: column;
	gap: 2px;

	list-style: none;
	width: max-content;

	max-width: 100%;
	margin: auto;
	margin-top: 0.5em;

	> li {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.3em;

		background: #8881;
		padding: 0.1em 0.5em;

		&:first-child {
			border-top-left-radius: 0.3em;
			border-top-right-radius: 0.3em;
		}

		&:last-child {
			border-bottom-left-radius: 0.3em;
			border-bottom-right-radius: 0.3em;
		}

		&[data-timeline="future"] {
			opacity: 0.3;
		}

		> :is(.id, .time) {
			font-size: 0.8em;
			opacity: 0.5;
			font-style: italic;
		}
	}
}

`

