
import {html} from "@benev/turtle"

// TODO use main package import from "@benev/turtle"
import {PathRouter} from "@benev/turtle/x/build/parts/path/path_router.js"

export const startup_scripts_with_debug_mode = (path: PathRouter) => html`
	<script>
		const params = new URLSearchParams(window.location.search)
		const launch_in_debug_mode = params.get("debug") === "true"

		function script(attributes) {
			const element = document.createElement("script")
			element.defer = true

			for (const [key, value] of Object.entries(attributes))
				element.setAttribute(key, value === true ?"" :value)

			document.head.appendChild(element)
		}

		if (launch_in_debug_mode) {

			script({
				type: "importmap-shim",
				src: "${path.version.root('importmap.json')}",
			})

			script({
				type: "module-shim",
				src: "${path.version.root('main.js')}",
			})

			script({
				type: "module",
				src: "${path.version.root('node_modules/es-module-shims/dist/es-module-shims.wasm.js')}",
			})
		}
		else {

			script({
				type: "module",
				src: "${path.version.root('main.bundle.min.js')}",
			})
		}
	</script>
`

