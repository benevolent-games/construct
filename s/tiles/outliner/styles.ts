
import {css} from "@benev/slate"
import {standard_tile_styles} from "../standard_tile_styles.js"

export const styles = css`

${standard_tile_styles}

:host {
	overflow-y: auto;
	--line-height: 1.5em;
}

ol {
	list-style: none;
	user-select: none;
}

li {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	gap: 0.2em;
	padding: 0 0.5em;

	&:nth-child(odd) {
		background: #88888808;
	}

	&:hover {
		background: #8881;
	}

	> * {
		flex: 0 0 auto;
	}

	> .gutter {
		width: 0.5em;
		margin-left: 0.5em;
		height: var(--line-height);
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

		&.delete:hover { color: red; }
	}

	> .name {
		flex: 1 1 auto;
		word-break: break-all;
		line-height: var(--line-height);

		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	> .id {
		opacity: 0.5;
		font-size: 0.6em;
		font-family: monospace;
	}

	> .spacer {
		width: 1em;
		height: 1em;
	}
}

`

