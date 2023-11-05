
import {UnitBase} from "./base.js"
import {UnitLamp} from "./lamp.js"
import {UnitInstance} from "./instance.js"

export namespace Unit {
	export type Base = UnitBase
	export type Instance = UnitInstance
	export type Lamp = UnitLamp
	export type Whatever = Instance | Lamp
}

