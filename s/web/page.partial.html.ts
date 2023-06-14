
import {template, html, Html} from "@benev/turtle"

const {url} = import.meta
type Options = {head?: Html, body?: Html}

export default template(async({path}, {head, body}: Options) => html`
	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width,initial-scale=1"/>
			<meta name="darkreader" content="dark"/>
			<link rel="stylesheet" href="${path(url).version.root('style.css')}"/>
			<title>@benev/edit</title>
			${head}
		</head>
		<body>
			${body}
		</body>
	</html>
`)

