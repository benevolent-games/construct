
import {css} from "lit";

export const size_of_resize_handle_in_rem = 0.2

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

.cell {
	display: flex;

	&[data-vertical] {
		flex-direction: column;
	}

	> * {
		flex: 0 0 auto;
	}

	> .resizer {
		position: relative;
		flex: 0 0 ${size_of_resize_handle_in_rem}rem;
		background: #444;
		cursor: ew-resize;
		user-select: none;
		-webkit-user-drag: none;
		user-drag: none;
		&:hover {
			background: #777;
		}
	}

	&[data-vertical] > .resizer {
		cursor: ns-resize;
	}
}

.pane {
	display: block;
}

.leaf {
	display: block;
}

`

