
import {css} from "lit";

export const style = css`

:host {
	display: block;
}

.container {
	display: flex;
	flex-direction: column;
	gap: 0.1em;
	padding: 0.2em 0.5em;
	padding-bottom: 2em;
}

h2 {
	font-size: 1.1em;
	opacity: 0.5;
}

h3 {
	font-size: 1.0em;
	text-align: center;
}

.glb {
	display: flex;
	flex-direction: column;
	gap: 0.2em;
	+ .glb {
		margin-top: 2em;
	}
}

:is(.glb-stats, .glb-props) {
	list-style: none;

	display: flex;
	flex-wrap: wrap;
	gap: 0.2em;
	justify-content: center;

	& li {
		flex: 1 0 auto;
		width: max-content;
	}
}

.glb-stats {
	font-size: 0.6em;
	opacity: 0.5;
}

.glb-props {
	font-size: 0.5em;
	position: relative;

	& button {
		font: inherit;
		display: block;
		background: transparent;
		width: 100%;
		height: 100%;

		position: relative;
		z-index: 1;
		transition: all 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
		transform: scale(1.0);

		&:hover {
			z-index: 2;
			border-color: #fffa;
			transform: scale(1.3);
		}

		&:active {
			color: #2f2f;
			border-color: #7f7f;
			transform: scale(1.4);
		}
	}
}

.glb-stats li,
.glb-props button {
	padding: 0.5em;
	color: #fff;
	border: 1px solid #fff4;
	border-radius: 0.2em;
	text-align: center;
	background: #111;
}

`
