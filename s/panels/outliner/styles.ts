
import {css} from "@benev/slate"
import {standard_panel_styles} from "../standard_panel_styles.js"

export const styles = css`

${standard_panel_styles}

:host {
	overflow-y: auto;
	--line-height: 1.5em;
}

ol {
	list-style: none;
	user-select: none;
}

li {
	position: relative;
	z-index: 0;
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

	& .dropzone {
		z-index: 1;
		opacity: 0.5;
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;

		&[data-drag-hover][data-drag-mode="into"] {
			background: color-mix(in srgb, var(--bravo) 50%, transparent 50%);
			border: 2px solid var(--bravo);
		}

		&[data-drag-hover][data-drag-mode="below"] {
			border-bottom: 2px solid var(--bravo);
		}

		> * {
			flex: 1 1 auto;
			width: 100%;
			height: 100%;
		}
	}

	& .gutter {
		width: 0.5em;
		margin-left: 0.5em;
		height: var(--line-height);
		border-left: 1px solid #fff2;
	}

	& .gripbox {
		flex: 1 1 auto;
		display: flex;
		gap: 0.2em;
	}

	& :is(button, .icon) {
		flex: 0 0 auto;
		opacity: 0.5;
		display: flex;
		place-content: center;
		place-items: center;

		&:is(button) {
			&:hover { opacity: 0.9; }
			&:active { opacity: 1; }
			&.delete:hover { color: red; }
		}

		> svg {
			display: block;
			width: 1em;
			height: 1em;
		}
	}

	& .name {
		flex: 1 1 auto;
		word-break: break-all;
		line-height: var(--line-height);

		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	& .childcount {
		opacity: 0.5;
		font-size: 0.8em;
		font-family: monospace;
		margin-right: 1em;
	}

	& .id {
		opacity: 0.5;
		font-size: 0.6em;
		font-family: monospace;
	}

	& .spacer {
		width: 1em;
		height: 1em;
	}
}

`

