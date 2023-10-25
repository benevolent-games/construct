
export function file_is_glb(file: File) {
	return !!(
		file.type.includes("gltf-binary") ||
		file.name.endsWith(".glb")
	)
}

