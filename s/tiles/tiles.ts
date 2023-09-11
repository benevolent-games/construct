
import {AboutTile} from "./about/tile.js"
import {UnknownTile} from "./unknown/tile.js"
import {TileSpec} from "../framework/frontend.js"
import {Layout} from "../elements/construct-layout/parts/layout.js"

export const tiles = {
	AboutTile,
	AdderTile: UnknownTile,
	CatalogTile: UnknownTile,
	OutlinerTile: UnknownTile,
	SettingsTile: UnknownTile,
	ViewportTile: UnknownTile,
	InspectorTile: UnknownTile,
} satisfies {[P in Layout.LeafName]: TileSpec<any>}

