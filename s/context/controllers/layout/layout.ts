
import {pub} from "@benev/slate"
import {Layout} from "../../../elements/construct-editor/parts/layout.js"
import {LayoutController} from "../../../elements/construct-editor/parts/layout_controller.js"

export class LayoutMachine {
	on_change = pub<void>()
	on_leaf_added = pub<Layout.Leaf>()
	on_leaf_deleted = pub<Layout.Leaf>()

	controller = new LayoutController({
		on_change: this.on_change.publish,
		on_leaf_added: this.on_leaf_added.publish,
		on_leaf_deleted: this.on_leaf_deleted.publish,
	})
}

