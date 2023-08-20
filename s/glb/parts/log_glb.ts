
import {basename} from "path"
import {human_bytes} from "../../tools/human_bytes.js"

export function log_glb({path, binary}: {path: string, binary: Uint8Array}) {
	console.log(basename(path), "::", human_bytes(binary.byteLength))
}

