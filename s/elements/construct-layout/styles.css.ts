
import {css} from "lit";

export const size_of_resize_handle_in_rem = 0.2

export const styles = css`

:host {
	display: block;
	width: 100%;
	height: 100%;

	--alpha: var(--construct-alpha, yellow);

	--resizer: var(--construct-resize, #000000);
	--pane: var(--construct-pane, #0c0c0c);
	--tab: var(--construct-tab, transparent);
	--leaf: var(--construct-leaf, #111);
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

	> .tabs {
		flex: 0 0 auto;
		display: flex;
		flex-direction: row;

		> .tab {
			display: flex;
			align-items: center;

			gap: 0.1em;
			padding: 0.2em;
			padding-left: 0.3em;
			padding-right: 0.1em;
			background: var(--tab);
			border-top: 0.1em solid transparent;

			&[data-permanent] {
				padding: 0.2em;
			}

			&[data-active] {
				border-color: var(--alpha);
				color: var(--alpha);
				background: var(--leaf);
			}

			& svg {
				position: absolute;
				inset: 0;
				width: 100%;
				height: 100%;
			}

			> .icon {
				position: relative;
				width: 1em;
				height: 1em;
			}

			> .x {
				position: relative;
				width: 0.7em;
				height: 0.7em;
				&[data-available]:hover {
					color: white;
					background: red;
					border-radius: 1em;
				}
			}
		}
	}

	> .leaf {
		flex: 1 1 auto;
		display: block;
		padding: 0.5em;
		background: var(--leaf);
	}
}

`

