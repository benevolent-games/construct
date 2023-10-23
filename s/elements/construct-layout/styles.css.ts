
import {css} from "@benev/slate"

export const size_of_resize_handle_in_rem = 0.2

export const styles = css`

:host {
	display: block;
	width: 100%;
	height: 100%;

	--alpha: var(--construct-alpha);
	--bravo: var(--construct-bravo);
	--bg-a: var(--construct-bg-a);
	--bg-b: var(--construct-bg-b);
}

:host {
	--resizer: var(--bg-b);
	--taskbar: var(--bg-a);
	--xxx-taskbar: color-mix(in srgb, var(--bg-a), var(--bg-b) 10%);

	--tab: transparent;
	--pane: var(--bg-a);
}

.layout {
	display: flex;
	width: 100%;
	height: 100%;
	overflow: hidden;

	> .cell {
		flex-basis: 100%;
	}
}

.cell {
	display: flex;
	width: 100%;
	height: 100%;

	&[data-vertical] {
		flex-direction: column;
	}

	> * {
		flex: 0 0 auto;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
	}

	&[data-vertical] > .resizer {
		cursor: ns-resize;
	}
}

.resizer {
	flex: 0 0 ${size_of_resize_handle_in_rem}rem;
	cursor: ew-resize;
	background: var(--resizer);
}

.pane {
	display: flex;
	flex-direction: column;
	background: var(--taskbar);
	position: relative;

	&[data-drag]::after {
		content: "";
		display: block;
		position: absolute;
		inset: 0;
		opacity: 0.1;
		border: 0.2em dashed var(--bravo);
		background: color-mix(in srgb, var(--bravo) 25%, transparent 75%);
		pointer-events: none;
	}

	> .taskbar {
		display: flex;
		justify-content: end;

		> * {
			flex: 0 0 auto;
			display: flex;

			> button {
				border: none;
				border-radius: 0;
				background: transparent;

				opacity: 0.6;
				&:hover { opacity: 1; }
				&:hover:active { color: var(--alpha); }
			}
		}

		> .tabs {
			flex: 0 0 auto;
			display: flex;
			flex-direction: row;
		}

		.actions {
			margin-left: auto;

			> button {
				padding: 0.2em 0.3em;

				&.x:hover { color: red; }
				&.x:hover:active { color: color-mix(in srgb, white, red); }

				> svg {
					width: 1em;
					height: 1em;
				}
			}
		}
	}

	> .leaf {
		position: relative;
		flex: 1 1 auto;
		display: block;
		padding: 0.5em;
		background: var(--pane);
	}

	> .adder {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(4em, 6em));
		justify-content: start;
		align-content: start;
		gap: 1em;

		> button {
			opacity: 0.6;
			display: flex;
			flex-direction: column;
			align-items: center;
			transition: all 100ms cubic-bezier(0.34, 1.56, 0.64, 1);
			transform: scale(1.0);
			color: #aaa;

			&:hover {
				opacity: 0.9;
				transform: scale(1.2);
			}

			&:active {
				opacity: 1;
			}

			> svg {
				width: 2em;
				height: 2em;
			}
		}
	}
}

::slotted(*) {
	display: contents;
}

.tabs {
	.tab {
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

	& button {
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
}

`

