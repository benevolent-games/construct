
export function human_time(ms: number) {
	const seconds = ms / 1000
	const format1 = (n: number) => Math.floor(n).toString().padStart(2, "0")
	const format2 = (n: number) => Math.floor(n).toString()

	if (seconds < 60)
		return `${format1(seconds)} seconds`

	if (seconds < 3600)
		return `${format1(seconds / 60)} minutes`

	if (seconds < 86400)
		return `${format1(seconds / 3600)} hours`

	return `${format2(seconds / 86400)} days`
}

