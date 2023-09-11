
import {css} from "lit"

export const theme = css`

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

button {
	display: inline-flex;
	align-items: center;
	justify-content: center;

	gap: 0.3em;

	font: inherit;
	color: inherit;
	background: transparent;
	padding: 0.2em 0.5em;
	border-radius: 0.2em;

	> svg {
		width: 1em;
		height: 1em;
	}
}

`

