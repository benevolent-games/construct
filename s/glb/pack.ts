
import {join} from "path"
import {dedup} from "@gltf-transform/functions"

import {args} from "./parts/args.js"
import {tiers} from "./parts/tiers.js"
import {glb_io} from "./parts/glb_io.js"
import {log_glb} from "./parts/log_glb.js"
import {generate_missing_lods} from "./parts/transforms/generate_missing_lods.js"

const {inpath, outdir} = args()
const gio = await glb_io()

const original = await gio.read(inpath)
log_glb(original)

await original.document.transform(
	dedup(),
	generate_missing_lods(),
)

for (const [index, [,transforms]] of tiers.entries()) {
	const document = original.document.clone()
	await document.transform(...transforms)
	const report = await gio.write(join(outdir, `pack.${index}.glb`), document)
	log_glb(report)
}

