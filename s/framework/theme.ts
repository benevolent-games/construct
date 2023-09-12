
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
	padding: 0.1em 0.2em;

	font: inherit;
	color: inherit;
	background: transparent;
	border-radius: 0.2em;
	border: none;
	border: 1px solid color-mix(in srgb, currentColor, transparent 80%);
	background: color-mix(in srgb, currentColor, transparent 90%);

	> svg {
		width: 1em;
		height: 1em;
	}

	&:hover {
		border-color: color-mix(in srgb, currentColor, transparent 70%);
		background: color-mix(in srgb, currentColor, transparent 90%);
	}

	&:active {
		border-color: color-mix(in srgb, currentColor, transparent 60%);
		background: color-mix(in srgb, currentColor, transparent 85%);
	}
}

`

