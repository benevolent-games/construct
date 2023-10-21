
import {css} from "@benev/slate"
import {standard_tile_styles} from "../standard_tile_styles.js"

export const styles = css`

${standard_tile_styles}

:host {
	overflow-y: auto;
}

h1 {
	width: 100%;
	display: flex;
	flex-direction: row;
	font-size: 1em;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;

	> button {
		display: flex;
		flex-direction: row;
		align-items: center;

		> svg {
			width: 3em;
			height: 3em;
		}
	}

	> span {
		font-size: 1.2em;
		margin: 0 1em;
	}
}

.chronicles {
	list-style: none;
	width: max-content;
	max-width: 100%;
	margin: auto;
	margin-top: 0.5em;

	> li {
		&[data-timeline="future"] {
			opacity: 0.3;
		}
	}
}

`

