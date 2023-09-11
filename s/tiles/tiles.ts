
import {AboutTile} from "./about/tile.js"
import {UnknownTile} from "./unknown/tile.js"
import {CatalogTile} from "./catalog/tile.js"
import {SettingsTile} from "./settings/tile.js"
import {OutlinerTile} from "./outliner/tile.js"
import {ViewportTile} from "./viewport/tile.js"
import {TileSpec} from "../framework/frontend.js"
import {InspectorTile} from "./inspector/tile.js"
import {Layout} from "../elements/construct-layout/parts/layout.js"

export const tiles = {
	AdderTile: UnknownTile,
	AboutTile,
	CatalogTile,
	OutlinerTile,
	SettingsTile,
	ViewportTile,
	InspectorTile,
} satisfies {[P in Layout.LeafName]: TileSpec<any>}

