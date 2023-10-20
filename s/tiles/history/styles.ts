
import {css} from "@benev/slate"
import {standard_tile_styles} from "../standard_tile_styles.js"

export const styles = css`

${standard_tile_styles}

.chronicles {
	> li {
		&[data-timeline="future"] {
			opacity: 0.3;
		}
	}
}

`

