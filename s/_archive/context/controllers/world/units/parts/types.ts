
import {LampUnit} from "../lamp.js"
import {InstanceUnit} from "../instance.js"
import {Item} from "../../../../domains/outline/types.js"

export type AnyUnit = InstanceUnit | LampUnit
export type UnitSource = Item.Instance | Item.Light

