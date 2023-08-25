
import {template, html, easypage, startup_scripts_with_dev_mode} from "@benev/turtle"

export default template(async basic => {
	const path = basic.path(import.meta.url)

	return easypage({
		path,
		css: "index.css",
		title: "@benev/construct",
		head: startup_scripts_with_dev_mode(path),
		body: html`
			<editor-layout>
				<p slot="leaf">hi</p>
			</editor-layout>
		`,
	})
})

// <benev-theater class=viewport disable-pointer-lock></benev-theater>
// <ed-catalog></ed-catalog>
// <div class=viewport></div>
// <ed-outliner></ed-outliner>
