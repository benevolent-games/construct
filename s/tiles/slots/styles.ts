
import {css} from "@benev/slate"
import {standard_tile_styles} from "../standard_tile_styles.js"

export const styles = css`

${standard_tile_styles}

:host {
	overflow-y: auto;
	--slot-bg: color-mix(in srgb, var(--construct-bg-c) 50%, var(--construct-bg-a));
	--glb-bg: var(--construct-bg-c);
}

.grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(6em, 32em));
	justify-content: center;
	list-style: none;

	padding: 1em;
	gap: 1em;
}

:is(.slot, .glb) {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 0.5em;

	> .name {
		align-self: start;
	}

	> small {
		align-self: end;
		opacity: 0.5;
		font-size: 0.5em;
	}
}

.slot {
	padding: 0.5em;
	background: var(--slot-bg);

	> .name { align-self: start; }
	> small { align-self: end; }

	> input {
		width: 100%;
		font: inherit;
		background: transparent;
		color: inherit;
		border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
		border-radius: 0.2em;
		padding: 0.1em 0.3em;
	}
}

.container {
	display: flex;

	> .griptape {
		width: 2em;
		flex: 0 0 auto;
		background: #080808;
		display: flex;
		flex-direction: column;
		place-content: center;

		> svg {
			width: 100%;
		}
	}

	> .glb {
		flex: 1 1 auto;
	}
}

.glb {
	background: var(--glb-bg);
	padding: 0.5em;
	min-height: 8em;

	&.empty {
		display: flex;
		place-content: center;
		align-items: center;
		font-style: italic;
	}

	> .name { align-self: center; }
	> small { align-self: center; }
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

		> span:nth-child(2) {
			opacity: 0.5;
			font-size: 0.6em;
		}
	}
}

`

