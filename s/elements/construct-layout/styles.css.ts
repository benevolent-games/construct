
import {css} from "lit";

export const size_of_resize_handle_in_rem = 1

export const styles = css`

:host {
	display: block;
	width: 100%;
	height: 100%;

	--alpha: var(--construct-alpha, yellow);

	--resizer: var(--construct-resize, #000000);
	--pane: var(--construct-pane, #080808);
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
			padding: 0.2em 0.4em;
			background: var(--tab);
			border-top: 0.1em solid transparent;

			&[data-active] {
				border-color: var(--alpha);
				color: var(--alpha);
				background: var(--leaf);
			}

			> svg {
				width: 1em;
				height: 1em;
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

