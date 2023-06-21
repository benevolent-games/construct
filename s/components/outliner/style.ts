
import {css} from "@chasemoskal/magical"

export const style = css`

div {
	p {
		color: green;
	}
}

.root-folder {
	.folder-objects, .folder-header {
		display: none;
	}
}

.root-folder-header {
	display: flex;
}

.folder:not([data-opened]) {
	.folder {
		display: none;
	}
}

.root-folder[data-opened]{
	> .folder > .folder-header {
		display: flex;
		span {
			cursor: pointer;
		}
	}
	.folder[data-opened] {
		> .folder-objects {
			display: flex;
		}
	}
	.folder[data-opened] > .folder {
			> .folder-header {
			display: flex;
			span {
				cursor: pointer;
			}
		}
	}
}

`

