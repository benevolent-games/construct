
import {themeElements} from "@chasemoskal/magical"
import {mixinSnapstate} from "xiome/x/framework/component/mixins/mixin-snapstate.js"

import {theme} from "./theme.js"
import {Context} from "./context.js"
import {EditOutliner} from "./outliner/component.js"

export function prepare_all_components(context: Context) {
	return themeElements(theme, {
		EditOutliner: mixinSnapstate(context.world)(
			EditOutliner.withContext(context)
		),
	})
}

