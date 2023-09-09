
import {css} from "lit";

export const size_of_resize_handle_in_rem = 0.4

export const styles = css`

:host {
	display: block;
	width: 100%;
	height: 100%;
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
	}

	&[data-vertical] > .resizer {
		cursor: ns-resize;
	}
}

.resizer {
	flex: 0 0 ${size_of_resize_handle_in_rem}rem;
	cursor: ew-resize;
	background: #fff1;
	border-left: 1px solid #fff1;
	border-right: 2px solid #0001;

	&:hover {
		background: #fff3;
	}
}

.pane {
	display: flex;
	flex-direction: column;

	.tabs {
		flex: 0 0 auto;
		display: flex;
		flex-direction: row;
		border: 1px solid red;
	}
}

.leaf {
	display: block;
}

`

