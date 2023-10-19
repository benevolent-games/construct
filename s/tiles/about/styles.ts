
import {css} from "@benev/slate"
import {standard_tile_styles} from "../standard_tile_styles.js"

export const styles = css`

${standard_tile_styles}

.logo {
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;

	> svg {
		width: 20em;
		max-width: 100%;
		max-height: 100%;
	}
}

`

