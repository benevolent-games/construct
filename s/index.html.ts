
import {template, html, easypage, startup_scripts_with_dev_mode} from "@benev/turtle"

export default template(async basic => {
	const path = basic.path(import.meta.url)

	return easypage({
		path,
		css: "style.css",
		title: "@benev/edit",
		head: startup_scripts_with_dev_mode(path),
		body: html`
			<div class=foundation>
				<ed-catalog></ed-catalog>
				<benev-theater disable-pointer-lock></benev-theater>
				<ed-outliner></ed-outliner>
			</div>
		`,
	})
})

