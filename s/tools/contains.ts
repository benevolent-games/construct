
export function contains(parent: Node, child: Node): boolean {
	let node: Node | null = child

	while (node) {
		if (node === parent)
			return true

		if (node.parentNode)
			node = node.parentNode

		else if ((node as ShadowRoot).host)
			node = (node as ShadowRoot).host

		else
			return false
	}

	return false
}

