
import {css} from "@benev/slate"
import {standard_tile_styles} from "../standard_tile_styles.js"

export const styles = css`

${standard_tile_styles}

:host {
	overflow-y: auto;
}

ol {
	list-style: none;
}

li {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	gap: 0.5em;
	padding: 0 1em;

	&:nth-child(odd) {
		background: #8881;
	}

	> * {
		flex: 0;
	}

	> .gutter {
		width: 0.5em;
		height: 1.2em;
		margin-left: 0.5em;
		border-left: 1px solid #fff2;
	}

	> button {
		opacity: 0.5;
		&:hover { opacity: 0.9; }
		&:active { opacity: 1; }

		> svg {
			display: block;
			width: 1em;
			height: 1em;
		}
	}

	> .name {
		flex: 1 1 auto;
		word-break: break-all;
		line-height: 1;
	}
}

`

