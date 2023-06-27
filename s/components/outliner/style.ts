
import {css} from "@chasemoskal/magical"

export const style = css`

:host {
	position: absolute;
	top: 0;
	left: 0;
	min-width: 100px;
	min-height: 150px;
	background-color: rgba(0,0,0, 0.50);
}

h1 {
	font-size: 20px;
	padding: 0.5em;
	color: #15d515;
	text-shadow: 0px 0px 5px #15d515;
}

.folders {
	background: linear-gradient(to bottom, rgba(40,40,40, 0.50) 50%, rgba(50,50,50, 0.50) 50%);
	background-size: 100% 48px;
	padding-left: 1em;
	padding-right: 1em;
}

div {
	p {
		color: white;
	}
}

.root-folder-header, .folder-header, .folder-objects {
	height: 24px;
}

.root-folder {
	.folder-objects, .folder-header {
		display: none;
	}
}

.root-folder-header {
	display: flex;
}

.root-folder-header p, .folder-header p {
	margin-right: 0.3em;
}

.root-folder-header, .folder-header {
	gap: 0.4em;
	span {
		cursor: pointer;
		font-weight: bold;
	}
}

.folder:not([data-opened]) {
	.folder {
		display: none;
	}
}

.root-folder[data-opened]{
	> .folder > .folder-header {
		display: flex;
	}
	.folder[data-opened] {
		> .folder-objects {
			display: flex;
		}
	}
	.folder[data-opened] > .folder {
		> .folder-header {
			display: flex;
		}
	}
	.folder, .folder-objects {
		margin-left: 1rem;
	}
}

`

