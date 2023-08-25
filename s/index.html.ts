
import {template, html, easypage, startup_scripts_with_dev_mode} from "@benev/turtle"

export default template(async basic => {
	const path = basic.path(import.meta.url)

	return easypage({
		path,
		css: "index.css",
		title: "@benev/construct",
		head: startup_scripts_with_dev_mode(path),
		body: html`
			<main class=foundation>
				<editor-layout>
					<p slot="plate-0-0-0">hi</p>
					<p slot="plate-1-0-0">there</p>
				</editor-layout>
			</main>
		`,
	})
})

// <benev-theater class=viewport disable-pointer-lock></benev-theater>
// <ed-catalog></ed-catalog>
// <div class=viewport></div>
// <ed-outliner></ed-outliner>
