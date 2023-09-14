
import {css} from "lit"

export const tab_styles = css`

:host {
	display: flex;
	flex-direction: row;
	position: relative;
}

.insert-indicator {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 2px;
	background: var(--bravo);
	border-radius: 1em;
	pointer-events: none;

	opacity: 0;
	&[data-drag] { opacity: 1; }
}

button {
	display: flex;
	align-items: center;

	border: none;
	border-radius: 0;

	gap: 0.1em;
	padding: 0.2em;
	padding-left: 0.3em;
	padding-right: 0.1em;
	background: var(--tab);
	border-top: 0.1em solid transparent;

	&[data-adder] {
		padding: 0.2em 1em;
		&:not(:hover):not([data-active]) {
			opacity: 0.2;
		}
	}

	opacity: 0.6;
	&:hover { opacity: 1; }
	&:hover:active { color: var(--alpha); }

	&[data-active] {
		opacity: 1;
		color: var(--alpha);
		border-color: var(--alpha);
		background: var(--pane);
	}

	> .icon {
		position: relative;
		width: 1em;
		height: 1em;
	}

	> .x {
		opacity: 0.3;
		position: relative;
		width: 0.7em;
		height: 0.7em;

		&[data-available]:hover {
			opacity: 1;
			color: white;
			background: red;
			border-radius: 1em;
		}
	}

	& svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
}

`

