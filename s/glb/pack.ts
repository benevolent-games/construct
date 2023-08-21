
import {join} from "path"
import {args} from "./parts/args.js"
import {tiers} from "./parts/tiers.js"
import {glb_io} from "./parts/glb_io.js"
import {log_glb} from "./parts/log_glb.js"
import {dedup} from "@gltf-transform/functions"
import {generate_lods} from "./parts/custom_transforms.js"

const {inpath, outdir} = args()
const gio = await glb_io()

const original = await gio.read(inpath)
log_glb(original)

// for (const node of original.document.getRoot().listNodes())
// 	console.log(node.getName())

await original.document.transform(
	dedup(),
	generate_lods(),
)

// for (const node of original.document.getRoot().listNodes())
// 	console.log(node.getName())

for (const [index, [,transforms]] of tiers.entries()) {
	const document = original.document.clone()
	await document.transform(...transforms)
	const report = await gio.write(join(outdir, `pack.${index}.glb`), document)
	log_glb(report)
}

