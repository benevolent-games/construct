
import {css} from "lit";

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

	> .cell {
		flex-basis: 100%;
	}
}

.cell {
	display: flex;

	&[data-vertical] {
		flex-direction: column;
		border: 2px solid #8f84;
	}

	> * {
		flex: 0 0 auto;
	}

	> .resizer {
		flex: 0 0 1em;
		background: yellow;
		cursor: ew-resize;
	}

	&[data-vertical] > .resizer {
		cursor: ns-resize;
	}
}

.pane {
	display: block;
	outliner: 1px solid red;
}

.leaf {
	display: block;
}

`

