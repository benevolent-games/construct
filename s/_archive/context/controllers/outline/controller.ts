
import {watch} from "@benev/slate"
import {Edcore} from "../edcore/controller.js"
import {OutlineModel} from "../../domains/outline2/model/model.js"
import {DataFacility} from "../../domains/outline2/data/facility.js"
import {OutlinerVisions} from "../../../panels/outliner/editor/types.js"

export class Outline {
	model: OutlineModel<any>
	facility: DataFacility<any>
	visions: OutlinerVisions<any>

	constructor(edcore: Edcore) {
		this.model = new OutlineModel<any>(
			watch.computed(() => edcore.state.outline2)
		)
		this.facility = new DataFacility({})
		this.visions = {}
	}
}

