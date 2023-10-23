
export class EzMap<K, V> extends Map<K, V> {
	guarantee(key: K, make: () => V) {
		if (this.has(key)) {
			return this.get(key)!
		}
		else {
			const value = make()
			this.set(key, value)
			return value
		}
	}
}

