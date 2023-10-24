
import {css} from "@benev/slate"
import {standard_tile_styles} from "../standard_tile_styles.js"

export const styles = css`

${standard_tile_styles}

:host {
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	gap: 0.1em;
	padding: 0.2em 0.5em;
	padding-bottom: 2em;
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

.glb-stats {
	list-style: none;
	user-select: none;

	font-size: 0.6em;
	opacity: 0.5;

	display: flex;
	flex-wrap: wrap;
	gap: 0.2em;
	justify-content: center;

	& li {
		flex: 1 0 auto;
		width: max-content;
		padding: 0.5em;
		color: #fff;
		text-align: center;
		border-radius: 0.2em;
		background: #111;
		border: 1px solid #fff4;
	}
}

.glb-props {
	margin-top: 1em;

	display: grid;
	list-style: none;
	grid-template-columns: repeat(auto-fit, minmax(2em, 4em));
	justify-content: center;
	gap: 0.5em;

	& li { display: contents; }

	& button {
		font: inherit;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: transparent;

		position: relative;
		z-index: 1;
		border: 1px solid transparent;
		transition: all 100ms cubic-bezier(0.34, 1.56, 0.64, 1);
		transform: scale(1.0);

		> img {
			display: block;
			width: 100%;
			user-drag: none;
			-webkit-user-drag: none;
			border-radius: 0.4em;
		}

		> span {
			font-size: 0.5em;
			width: 100%;
			height: 2.4em;
			line-height: 1.2;
			word-break: break-all;

			text-overflow: ellipsis;
			overflow: hidden;
		}

		&:hover {
			z-index: 2;
			border-color: #fffa;
			transform: scale(1.1);
			border: 1px solid #fff4;
		}

		&:active {
			color: #2f2f;
			border-color: #7f7f;
			transform: scale(1.2);
		}
	}
}

`

