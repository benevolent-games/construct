
import {css} from "@benev/slate"
import {standard_tile_styles} from "../standard_tile_styles.js"

export const styles = css`

${standard_tile_styles}

:host {
	overflow-y: auto;
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

.intro {
	width: 100%;
	text-align: center;
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
	position: relative;

	& button {
		font: inherit;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: transparent;
		width: 100%;
		height: 100%;

		position: relative;
		z-index: 1;
		transition: all 100ms cubic-bezier(0.34, 1.56, 0.64, 1);
		transform: scale(1.0);

		> img {
			display: block;
			width: 4em;
			height: 4em;
		}

		> span {
			font-size: 0.6em;
			max-width: 6em;
			word-break: break-all;
		}

		&:hover {
			z-index: 2;
			border-color: #fffa;
			transform: scale(1.1);
		}

		&:active {
			color: #2f2f;
			border-color: #7f7f;
			transform: scale(1.2);
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

