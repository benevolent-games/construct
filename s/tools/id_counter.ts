
export class IdCounter {
	count: number = 0

	constructor(count: number = 0) {
		this.count = count
	}

	pull() {
		return this.count++
	}
}

