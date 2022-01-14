class MockupsParser {
	constructor() {
		this.entries = [];
	}

	parse(packet) {
		if (packet[0] !== 'J') throw new TypeError('Invalid packet header; expected packet `J`');

		this.entries.push(...packet.slice(1));
		return this;
	}

	get(index) {
		const idx = this.entries.indexOf(index) + 1;

		if (idx === 0) return console.error(`Index ${index} not present in mockups`, this.entries);

		return JSON.parse(this.entries[idx]);
	}
}
