
import {css} from "@benev/slate"
import {standard_panel_styles} from "../standard_panel_styles.js"

export const styles = css`

${standard_panel_styles}

:host {
	overflow-y: auto;

	--line-height: 1.5em;
	--line-bg: transparent;
	--line-bg-alt: #88888808;
	--line-bg-hover: #8881;

	--select: var(--alpha);
	--drag: var(--charlie);
	--drop: var(--bravo);

	--select-bg: color-mix(in srgb, var(--select) 10%, transparent);
	--select-border: color-mix(in srgb, var(--select) 30%, transparent);

	--drag-bg: color-mix(in srgb, var(--drag) 10%, transparent);
	--drag-border: color-mix(in srgb, var(--drag) 30%, transparent);

	--drop-bg: color-mix(in srgb, var(--drop) 10%, transparent);
	--drop-border: color-mix(in srgb, var(--drop) 30%, transparent);
}

ol {
	width: 100%;
	min-height: 100%;
	list-style: none;
	user-select: none;
	container-type: inline-size;
}

li {
	position: relative;
	z-index: 0;
	display: flex;
	flex-direction: row;
	justify-content: end;
	align-items: center;
	width: 100%;
	gap: 0.2em;
	padding: 0 0.5em;
	overflow: hidden;
	background: var(--line-bg);

	&:nth-child(odd) {
		background: var(--line-bg-alt);
	}

	&:hover {
		background: var(--line-bg-hover);
	}

	&[data-not-apparent] {
		opacity: 0.3;
	}

	&[data-selected]::before {
		content: "";
		display: block;
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: var(--select-bg);
		border: 1px solid var(--select-border);
	}

	&[data-selected] + [data-selected]::before {
		border-top: 0;
	}

	> * {
		flex: 0 0 auto;
	}

	& :is(.dragzone, .dropzone) {
		z-index: 1;
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
	}

	& .dragzone {
		background: var(--drag-bg);
		border: 1px solid var(--drag-border);
	}

	& .dropzone {
		> * {
			flex: 1 1 auto;
			width: 100%;
			height: 100%;
		}

		&[data-drop-hover][data-drop-mode="above"] {
			background: linear-gradient(
				to bottom,
				var(--drop-bg),
				transparent
			);
			&::after {
				content: "";
				position: absolute;
				inset: 0;
				pointer-events: none;
				border-top: 2px solid var(--drop-border);
			}
		}

		&[data-drop-hover][data-drop-mode="into"] {
			border: 2px solid var(--drop-border);
			background: var(--drop-bg);
		}

		&[data-drop-hover][data-drop-mode="below"] {
			background: linear-gradient(
				to bottom,
				transparent,
				var(--drop-bg)
			);
			&::after {
				content: "";
				position: absolute;
				inset: 0;
				pointer-events: none;
				border-bottom: 2px solid var(--drop-border);
			}
		}
	}

	& .gutter-group {
		flex: 0 0 auto;
		display: flex;
		justify-content: start;
		overflow: hidden;

		& .gutter {
			flex: 0 0 auto;
			width: 0.5em;
			margin-left: 0.5em;
			height: var(--line-height);
			border-left: 1px solid #fff2;
			transition: all 200ms linear;
		}
	}

	& .gripbox {
		flex: 1 1 auto;
		display: flex;
		gap: 0.2em;
		overflow: hidden;
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

@container (width < 24em) {
	[data-unnecessary] {
		display: none;
	}

	li {
		& .gutter-group {
			& .gutter {
				width: 0.1em;
				margin-left: 0.1em;
			}
		}
	}
}

`

