
import {css} from "lit";

export const size_of_resize_handle_in_rem = 0.2

export const styles = css`

:host {
	display: block;
	width: 100%;
	height: 100%;

	--alpha: var(--construct-alpha, yellow);

	--bg-a: var(--construct-bg-a, #111);
	--bg-b: var(--construct-bg-b, #000);

	--resizer: var(--construct-resize, var(--bg-b));
	--pane: var(--construct-resize, color-mix(in srgb, var(--bg-a), var(--bg-b) 50%));
	--tab: var(--construct-resize, transparent);
	--leaf: var(--construct-resize, var(--bg-a));
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

:is(.resizer, .cell, .pane) {
	user-select: none;
	-webkit-user-drag: none;
	user-drag: none;
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
	background: var(--pane);

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

			> button {
				display: flex;
				align-items: center;

				gap: 0.1em;
				padding: 0.2em;
				padding-left: 0.3em;
				padding-right: 0.1em;
				background: var(--tab);
				border-top: 0.1em solid transparent;

				&[data-permanent] {
					padding: 0.2em 1em;
					&:not(:hover):not([data-active]) {
						opacity: 0.2;
					}
				}

				&[data-active] {
					opacity: 1;
					color: var(--alpha);
					border-color: var(--alpha);
					background: var(--leaf);
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
		background: var(--leaf);
	}

	> .adder {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
		align-content: start;
		> button {
			flex: 0 1 auto;
			width: 12em;
		}
	}
}

::slotted(*) {
	display: contents;
}

`

