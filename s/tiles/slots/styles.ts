
import {css} from "@benev/slate"
import {standard_tile_styles} from "../standard_tile_styles.js"

export const styles = css`

${standard_tile_styles}

:host {
	overflow-y: auto;

	--empty-bg: color-mix(
		in srgb,
		var(--construct-bg-a) 85%,
		var(--construct-bg-b)
	);

	--assigned-bg: linear-gradient(
		to bottom,
		color-mix(
			in srgb,
			var(--construct-bg-a),
			var(--construct-bg-c) 100%
		),
		color-mix(
			in srgb,
			var(--construct-bg-a),
			var(--construct-bg-c) 60%
		)
	);
}

.grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(6em, 32em));
	justify-content: center;
	list-style: none;
	padding: 1em;
	gap: 0.5em;
}

.slot {
	display: flex;
	flex-direction: column;
	gap: 0.1em;
	> * { flex: 0 0 auto; }
	> .glb { flex: 1 1 auto; }
	> small { align-self: end; }
}

.bar {
	display: flex;
	gap: 0.5em;
	padding: 0.2em 2em;

	> .name {
		flex: 1 1 auto;

		&:is(input) {
			width: 100%;
			font: inherit;
			background: transparent;
			color: inherit;
			border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
			border-radius: 0.2em;
			padding: 0.1em 0.3em;
		}
	}

	> .id {
		margin-left: auto;
	}
}

.glb {
	position: relative;
	display: flex;
	min-height: 5em;
	border-radius: 1em;
	user-select: none;
	overflow: hidden;

	&[data-drag-is-picked-up] {
		outline: 2px solid yellow;
		&::after {
			content: "";
			display: block;
			position: absolute;
			inset: 0;
			background: color-mix(in srgb, var(--construct-alpha) 10%, transparent);
		}
	}

	&[data-drag-is-hovered-over] {
		outline: 2px solid lime;
		&::after {
			content: "";
			display: block;
			position: absolute;
			inset: 0;
			background: color-mix(in srgb, var(--construct-bravo) 5%, transparent);
		}
	}

	&[data-status="empty"] {
		place-content: center;
		background: var(--empty-bg);
		box-shadow: inset 0.2em 0.5em 1em #0006;
		border-bottom: 1px solid #fff2;
		align-items: center;
		font-style: italic;
		color: color-mix(in srgb, currentColor 33%, transparent)
	}

	&[data-status="assigned"] {
		background: var(--assigned-bg);
		box-shadow: 0.2em 0.5em 1em #0004;
		border-top: 1px solid #fff4;

		.cap {
			width: 2em;
			flex: 0 0 auto;
			display: flex;
			flex-direction: column;
			place-content: center;

			&.grip {
				color: color-mix(in srgb, currentColor 25%, transparent);
				> svg { width: 100%; }
			}

			&.deleter {
				> button {
					width: 100%;
					> svg { width: 100%; }
				}
			}
		}

		.plate {
			flex: 1 1 auto;
			display: flex;
			flex-direction: column;
			place-content: center;
			place-items: center;
			gap: 0.2em;
			padding: 0.5em;

			> .heading {
				display: flex;
				place-content: center;
				place-items: center;
				gap: 0.5em;
			}

			> .id {
				text-align: center;
			}
		}
	}
}

.id {
	opacity: 0.5;
	font-size: 0.6em;
}

button.delete {
	&:hover { color: red; }
}

.stats {
	list-style: none;
	display: flex;
	justify-content: center;
	gap: 0.5em;
	flex-wrap: wrap;

	> li {
		display: flex;
		flex-direction: column;
		text-align: center;

		> span:nth-child(1) {
			opacity: 0.8;
			font-size: 0.8em;
		}

		> span:nth-child(2) {
			opacity: 0.5;
			font-size: 0.6em;
		}
	}
}

.buttons {
	display: flex;
	justify-content: center;
	margin-top: 2em;

	> .new {
		padding: 0.5em 1em;
	}
}

`

