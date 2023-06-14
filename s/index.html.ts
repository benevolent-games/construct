
import {template, html, easypage, startup_scripts_with_debug_mode} from "@benev/turtle"

export default template(async basic => {
	const path = basic.path(import.meta.url)

	return easypage({
		path,
		css: "style.css",
		title: "@benev/edit",
		head: startup_scripts_with_debug_mode(path),
		body: html`
			<p><strong>@benev/</strong>edit</p>
		`,
	})
})

