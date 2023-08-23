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

li {
	list-style-type: none;
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
	padding-left: 0.7em;
	padding-right: 0.7em;
}

div {
	p {
		color: white;
	}
}

svg {
	width: 21px;
	height: 22px;
}

span {
	display: flex;
	align-items: center;
}

.folder-header, .folder-header, .item {
	height: 24px;
}

.folder {
	.item, .folder-header {
		display: none;
	}
}

.folder-header {
	display: flex;
	align-items: center;
	p {
		margin: 0 0.3em;
	}
}

.open-folder:hover, .delete-folder:hover, .toggle-visibility:hover, .add-folder:hover {
	filter: brightness(0.7);
}
.delete-folder {
	margin-left: 0.1em;
	width: 18px;
	height: 19px;
	cursor: pointer;
}
.toggle-visibility {
	margin-left: 0.6em;
	width: 18px;
	height: 19px;
	cursor: pointer;
}

.folder-header p, .folder-header p {
	margin-right: 0.3em;
}

.folder-header {
	gap: 0.1em;
	span {
		cursor: pointer;
	}
}

.folder:not([data-opened]) {
	.folder {
		display: none;
	}
}

.item[data-notvisible], .folder-header[data-notvisible] {
	opacity: 0.25;
}

.folder-header[data-outline] {
	box-shadow: inset 0 0 0.5em 0 #15d515;
	> *:not(.folder-header) {
		pointer-events: none;
	}
}

.folder[data-opened] {
	> .folder-header .open-folder {
		transform: rotate(-90deg)
	}
	> .item {
		display: flex;
		gap: 0.4em;
		align-items: center;
	}
	> .folder > .folder-header {
		display: flex;
	}
	.folder[data-opened] {
		> .item {
			display: flex;
			gap: 0.4em;
			align-items: center;
		}
	}
	.folder, .item {
		margin-left: 1rem;
	}
}

.input-rename {
	background-color: transparent;
	border: 1px solid white;
	border-radius: 5px;
	font-size: 20px;
	color: white;
}

`

