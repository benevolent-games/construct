
import {css} from "@benev/slate"
import {standard_panel_styles} from "../standard_panel_styles.js"

export const styles = css`

${standard_panel_styles}

.container {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
}

canvas {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
}

svg {
	opacity: 0;
	transition: opacity 200ms linear;
	position: absolute;
	inset: 0;
	margin: auto;
	width: 1em;
	height: 1em;
	color: white;
	filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.6));
	pointer-events: none;
}

.container[data-pointer-locked] svg {
	opacity: 0.5;
}

`

